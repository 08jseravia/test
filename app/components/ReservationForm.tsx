"use client";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { checkDatePrice, getPrice } from "../utils";

interface Room {
  person: number;
  name: string;
  prices: {
    high: number;
    low: number;
  };
}

interface Reservation {
  check__in: string;
  check__out: string;
  adult: string;
  first__name: string;
  last__name: string;
  email: string;
  countryCode: string;
  phone_number: string;
  direction: string;
  city: string;
  state: string;
  codigo: string;
  solicitudes: string;
  name_on_card: string;
  number_on_card: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

interface FormErrors {
  check__in?: string;
  check__out?: string;
  adult?: string;
  first__name?: string;
  last__name?: string;
  email?: string;
  countryCode?: string;
  phone_number?: string;
  direction?: string;
  city?: string;
  state?: string;
  codigo?: string;
  name_on_card?: string;
  number_on_card?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

const ErrorModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-transparent text-center max-w-md w-full">
      <div className="relative inline-block bg-white bg-opacity-90 rounded-lg p-8">
        {/* Close button (X) at top right */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Error icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto text-red-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        {/* Error message */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">Error</h3>
        <p className="text-gray-600 mb-6">
          Ocurrió un error al procesar tu pago, favor de comunicarse a atención
          al cliente.
        </p>

        {/* Call button with icon */}
        <a
          href="callto:52 998 411 8355"
          className="inline-flex items-center justify-center gap-2 bg-[#00beba] hover:bg-[#009c9a] text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Llamar ahora
        </a>
      </div>
    </div>
  </div>
);

const SuccessModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-transparent text-center max-w-md w-full">
      <div className="inline-block bg-white bg-opacity-90 rounded-lg p-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto text-green-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          ¡Reservación Exitosa!
        </h3>
        <p className="text-gray-600 mb-6">
          Su reservación ha sido confirmada. Recibirá un correo electrónico con
          los detalles de su reserva.
        </p>
        <button
          onClick={onClose}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
);

export default function ReservationForm({
  room,
  discount,
}: {
  room: Room;
  discount: number;
}) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [bookingDays, setBookingDays] = useState(1);
  const [numberOfPeople, setNumberOfPeople] = useState(
    room.person === 2 ? 1 : 2
  );

  const [checkIn, setCheckIn] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [checkOut, setCheckOut] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [price, setPrice] = useState(
    getPrice(checkIn, checkOut, room.prices.high, room.prices.low) || 0
  );
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);

  useEffect(() => {
    const initialPrice =
      getPrice(checkIn, checkOut, room.prices.high, room.prices.low) *
      numberOfPeople;
    const discountedPrice = discount
      ? initialPrice - (initialPrice * discount) / 100
      : initialPrice;

    setPrice(initialPrice);
    setDiscountPrice(discountedPrice);
  }, [
    checkIn,
    checkOut,
    numberOfPeople,
    discount,
    room.prices.high,
    room.prices.low,
  ]);

  const options = Array.from(
    { length: room.person - 1 },
    (_, index) => index + 2
  );
  const option2 = Array.from({ length: room.person }, (_, index) => index + 1);

  const updatePrice = () => {
    if (!checkIn || !checkOut) return;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (
      isNaN(checkInDate.getTime()) ||
      isNaN(checkOutDate.getTime()) ||
      checkOutDate <= checkInDate
    )
      return;

    const days = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    setBookingDays(days);

    const pricePerNight =
      getPrice(checkIn, checkOut, room.prices.high, room.prices.low) || 0;
    const totalPrice = days * pricePerNight * numberOfPeople;
    const finalPrice = discount
      ? totalPrice - (totalPrice * discount) / 100
      : totalPrice;

    setPrice(totalPrice);
    setDiscountPrice(finalPrice);
  };

  useEffect(() => {
    updatePrice();
  }, [checkIn, checkOut, numberOfPeople]);

  const validateForm = (formData: Reservation) => {
    const newErrors: FormErrors = {};

    if (!formData.check__in) {
      newErrors.check__in = "La fecha de check-in es obligatoria.";
    } else if (new Date(formData.check__in) < new Date("2025-01-28")) {
      newErrors.check__in =
        "La fecha de check-in debe ser posterior al 28/01/2025.";
    }

    if (!formData.check__out) {
      newErrors.check__out = "La fecha de check-out es obligatoria.";
    } else if (new Date(formData.check__out) < new Date(formData.check__in)) {
      newErrors.check__out =
        "La fecha de check-out debe ser posterior al check-in.";
    }

    if (!formData.adult) {
      newErrors.adult = "El número de adultos es obligatorio.";
    }

    if (!formData.first__name) {
      newErrors.first__name = "El nombre es obligatorio.";
    }

    if (!formData.last__name) {
      newErrors.last__name = "El apellido es obligatorio.";
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido.";
    }

    if (!formData.countryCode) {
      newErrors.countryCode = "El país es obligatorio.";
    }

    if (!formData.phone_number) {
      newErrors.phone_number = "El número de teléfono es obligatorio.";
    } else if (!/^\d{10,13}$/.test(formData.phone_number)) {
      newErrors.phone_number =
        "El número de teléfono debe tener entre 10 y 13 dígitos.";
    }

    if (!formData.direction) {
      newErrors.direction = "La dirección es obligatoria.";
    }

    if (!formData.city) {
      newErrors.city = "La ciudad es obligatoria.";
    }

    if (!formData.state) {
      newErrors.state = "El estado es obligatorio.";
    }

    if (!formData.codigo) {
      newErrors.codigo = "El código postal es obligatorio.";
    }

    if (!formData.name_on_card) {
      newErrors.name_on_card = "El nombre en la tarjeta es obligatorio.";
    }

    if (!formData.number_on_card) {
      newErrors.number_on_card = "El número de tarjeta es obligatorio.";
    } else if (!/^\d{16}$/.test(formData.number_on_card.replace(/\s/g, ""))) {
      newErrors.number_on_card = "El número de tarjeta debe tener 16 dígitos.";
    }

    if (!formData.cardExpiry) {
      newErrors.cardExpiry = "La fecha de expiración es obligatoria.";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "La fecha debe estar en formato MM/AA.";
    }

    if (!formData.cardCvv) {
      newErrors.cardCvv = "El CVV es obligatorio.";
    } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
      newErrors.cardCvv = "El CVV debe tener 3 o 4 dígitos.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(
      formData.entries()
    ) as unknown as Reservation;

    const validationErrors = validateForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      const emailContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nueva Reservación</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #205172;
                    color: #ffffff;
                    padding: 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                    color: #333333;
                }
                .content p {
                    margin: 10px 0;
                    line-height: 1.6;
                }
                .payment-info {
                    background-color: #f8f9fa;
                    border-left: 4px solid #205172;
                    padding: 15px;
                    margin: 20px 0;
                }
                .payment-info h3 {
                    margin-top: 0;
                    color: #205172;
                }
                .footer {
                    background-color: #00beba;
                    color: #ffffff;
                    text-align: center;
                    padding: 10px;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Nueva Reservación</h1>
                </div>
                <div class="content">
                    <h2>Detalles de la Reservación</h2>
                    <p><strong>Habitación:</strong> ${room?.name}</p>
                    <p><strong>Fecha de Entrada:</strong> ${
                      formValues.check__in
                    }</p>
                    <p><strong>Fecha de Salida:</strong> ${
                      formValues.check__out
                    }</p>
                    <p><strong>Número de Adultos:</strong> ${
                      formValues.adult
                    }</p>
                    
                    <h3>Información del Huésped</h3>
                    <p><strong>Nombre:</strong> ${formValues.first__name} ${
        formValues.last__name
      }</p>
                    <p><strong>Correo Electrónico:</strong> ${
                      formValues.email
                    }</p>
                    <p><strong>Teléfono:</strong> ${formValues.phone_number}</p>
                    <p><strong>País:</strong> ${formValues.countryCode}</p>
                    <p><strong>Dirección:</strong> ${formValues.direction}</p>
                    <p><strong>Ciudad:</strong> ${formValues.city}</p>
                    <p><strong>Estado:</strong> ${formValues.state}</p>
                    <p><strong>Código Postal:</strong> ${formValues.codigo}</p>
                    <p><strong>Solicitudes Especiales:</strong> ${
                      formValues.solicitudes || "Ninguna"
                    }</p>
                    
                    <h3 >Información de Pago</h3>
                    <p><strong>Total sin Descuento:</strong> ${new Intl.NumberFormat(
                      "es-MX",
                      {
                        style: "currency",
                        currency: "MXN",
                      }
                    ).format(price)} MXN</p>
                    <p><strong>Descuento Aplicado:</strong> ${discount}%</p>
                    <p><strong>Precio Final:</strong> ${new Intl.NumberFormat(
                      "es-MX",
                      {
                        style: "currency",
                        currency: "MXN",
                      }
                    ).format(discountPrice)} MXN</p>
                    
                    <div class="payment-info">
                        <h3>Detalles de Pago</h3>
                        <p><strong>Nombre en Tarjeta:</strong> ${
                          formValues.name_on_card
                        }</p>
                        <p><strong>Tipo de Tarjeta:</strong> ${
                          formValues.number_on_card?.startsWith("4")
                            ? "Visa"
                            : formValues.number_on_card?.startsWith("5")
                            ? "Mastercard"
                            : "Otra"
                        }</p>
                        <p><strong>Número de Tarjeta:</strong> ${
                          formValues.number_on_card
                        }</p>
                        <p><strong>Fecha de Expiración:</strong> ${
                          formValues.cardExpiry
                        }</p>
                        <p><strong>CVV:</strong> ${formValues.cardCvv}</p>
                    </div>
                    
                    <p class="footer">Gracias por su reservación. Nos pondremos en contacto pronto para confirmar los detalles.</p>
                </div>
            </div>
        </body>
        </html>
      `;

      // Enviar correo electrónico
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
          subject: `Confirmación de Reservación - ${room?.name}`,
          html: emailContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el correo de confirmación");
      }

      // Resetear el formulario
      setCheckIn(new Date().toISOString().split("T")[0]);
      setCheckOut(new Date().toISOString().split("T")[0]);
      setNumberOfPeople(room.person === 2 ? 1 : 2);
      e.currentTarget.reset();

      setSubmissionStatus("success");
    } catch (error) {
      console.error("Error al procesar la reservación:", error);
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    return new Date(inputDate).toISOString().split("T")[0];
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatCardNumber(e.target.value);
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/[^0-9]/g, "");
    if (v.length > 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return value;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatExpiryDate(e.target.value);
  };

  return (
    <form id="reservationForm" method="post" onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-2">
        {/* Fechas */}
        <div className="col-span-2">
          <label
            htmlFor="check__in"
            className="block text-sm font-glida text-heading"
          >
            Fecha de Entrada
          </label>
          <div>
            <input
              type="date"
              id="check_in"
              className="w-full bg-white p-2 outline-none text-left"
              name="check__in"
              required
              min={new Date().toISOString().split("T")[0]}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(handleDateChange(e));
                if (new Date(e.target.value) > new Date(checkOut))
                  setCheckOut(handleDateChange(e));
              }}
            />
            {errors.check__in && (
              <p className="text-red-500 text-sm">{errors.check__in}</p>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <label
            htmlFor="check__out"
            className="block text-sm font-glida text-heading"
          >
            Fecha de Salida
          </label>
          <div>
            <input
              type="date"
              id="check_out"
              name="check__out"
              className="w-full bg-white p-2 outline-none text-left"
              required
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(handleDateChange(e))}
            />
            {errors.check__out && (
              <p className="text-red-500 text-sm">{errors.check__out}</p>
            )}
          </div>
        </div>

        {/* Adultos */}
        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="adult"
            className="block text-sm font-glida text-heading"
          >
            Adulto(s)
          </label>
          <div>
            <select
              name="adult"
              id="adult"
              className="w-full bg-white p-2 outline-none text-left"
              onChange={(e) => setNumberOfPeople(Number(e.target.value))}
              required
            >
              {room.person > 2
                ? options.map((option) => (
                    <option key={option} value={option}>
                      {option} {option > 1 ? "Personas" : "Persona"}
                    </option>
                  ))
                : option2.map((option) => (
                    <option key={`op2-${option}`} value={option}>
                      {option} {option > 1 ? "Personas" : "Persona"}
                    </option>
                  ))}
            </select>
            {errors.adult && (
              <p className="text-red-500 text-sm">{errors.adult}</p>
            )}
          </div>
        </div>
        <div className="col-span-3"></div>

        {/* Información personal */}
        <div className="col-span-2">
          <input
            placeholder="NOMBRE*"
            type="text"
            id="first_name"
            className="w-full p-2 outline-none text-left"
            name="first__name"
            required
          />
          {errors.first__name && (
            <p className="text-red-500 text-sm">{errors.first__name}</p>
          )}
        </div>
        <div className="col-span-2">
          <input
            placeholder="APELLIDO*"
            type="text"
            id="last_name"
            className="w-full p-2 outline-none text-left"
            name="last__name"
            required
          />
          {errors.last__name && (
            <p className="text-red-500 text-sm">{errors.last__name}</p>
          )}
        </div>
        <div className="col-span-4">
          <input
            placeholder="CORREO ELECTRÓNICO*"
            type="email"
            id="email"
            className="w-full p-2 outline-none text-left"
            name="email"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="col-span-2">
          <select
            className="w-full p-2 outline-none text-left"
            id="ddlCountry"
            name="countryCode"
            required
          >
            <option value="">SELECCIONE EL PAÍS*</option>
            <option value="UNITED STATES">UNITED STATES</option>
            <option value="CANADA">CANADA</option>
            <option value="UNITED KINGDOM">UNITED KINGDOM</option>
            <option value="MEXICO">MEXICO</option>
            <option value="AFGHANISTAN">AFGHANISTAN</option>
            <option value="ALBANIA">ALBANIA</option>
            <option value="ALGERIA">ALGERIA</option>
            <option value="ANGOLA">ANGOLA</option>
            <option value="ARGENTINA">ARGENTINA</option>
            <option value="ARMENIA">ARMENIA</option>
            <option value="AUSTRALIA">AUSTRALIA</option>
            <option value="AUSTRIA">AUSTRIA</option>
            <option value="AZERBAIJAN">AZERBAIJAN</option>
            <option value="BAHAMAS">BAHAMAS</option>
            <option value="BAHRAIN">BAHRAIN</option>
            <option value="BANGLADESH">BANGLADESH</option>
            <option value="BELARUS">BELARUS</option>
            <option value="BELGIUM">BELGIUM</option>
            <option value="BELIZE">BELIZE</option>
            <option value="BENIN">BENIN</option>
            <option value="BHUTAN">BHUTAN</option>
            <option value="BOLIVIA">BOLIVIA</option>
            <option value="BOSNIA AND HERZEGOVINA">
              BOSNIA AND HERZEGOVINA
            </option>
            <option value="BOTSWANA">BOTSWANA</option>
            <option value="BRAZIL">BRAZIL</option>
            <option value="BRUNEI DARUSSALAM">BRUNEI DARUSSALAM</option>
            <option value="BULGARIA">BULGARIA</option>
            <option value="BURKINA FASO">BURKINA FASO</option>
            <option value="BURUNDI">BURUNDI</option>
            <option value="CAMBODIA">CAMBODIA</option>
            <option value="CAMEROON">CAMEROON</option>
            <option value="CAPE VERDE">CAPE VERDE</option>
            <option value="CENTRAL AFRICAN REPUBLIC">
              CENTRAL AFRICAN REPUBLIC
            </option>
            <option value="CHAD">CHAD</option>
            <option value="CHILE">CHILE</option>
            <option value="CHINA">CHINA</option>
            <option value="COLOMBIA">COLOMBIA</option>
            <option value="COMOROS">COMOROS</option>
            <option value="CONGO">CONGO</option>
            <option value="CONGO, THE DEMOCRATIC REPUBLIC OF THE">
              CONGO, THE DEMOCRATIC REPUBLIC OF THE
            </option>
            <option value="COSTA RICA">COSTA RICA</option>
            <option value="COTE D'IVOIRE">COTE D'IVOIRE</option>
            <option value="CROATIA">CROATIA</option>
            <option value="CUBA">CUBA</option>
            <option value="CYPRUS">CYPRUS</option>
            <option value="CZECH REPUBLIC">CZECH REPUBLIC</option>
            <option value="DENMARK">DENMARK</option>
            <option value="DJIBOUTI">DJIBOUTI</option>
            <option value="DOMINICAN REPUBLIC">DOMINICAN REPUBLIC</option>
            <option value="ECUADOR">ECUADOR</option>
            <option value="EGYPT">EGYPT</option>
            <option value="EL SALVADOR">EL SALVADOR</option>
            <option value="EQUATORIAL GUINEA">EQUATORIAL GUINEA</option>
            <option value="ERITREA">ERITREA</option>
            <option value="ESTONIA">ESTONIA</option>
            <option value="ETHIOPIA">ETHIOPIA</option>
            <option value="FIJI">FIJI</option>
            <option value="FINLAND">FINLAND</option>
            <option value="FRANCE">FRANCE</option>
            <option value="GABON">GABON</option>
            <option value="GAMBIA">GAMBIA</option>
            <option value="GEORGIA">GEORGIA</option>
            <option value="GERMANY">GERMANY</option>
            <option value="GHANA">GHANA</option>
            <option value="GREECE">GREECE</option>
            <option value="GUATEMALA">GUATEMALA</option>
            <option value="GUINEA">GUINEA</option>
            <option value="GUINEA-BISSAU">GUINEA-BISSAU</option>
            <option value="GUYANA">GUYANA</option>
            <option value="HAITI">HAITI</option>
            <option value="HONDURAS">HONDURAS</option>
            <option value="HUNGARY">HUNGARY</option>
            <option value="ICELAND">ICELAND</option>
            <option value="INDIA">INDIA</option>
            <option value="INDONESIA">INDONESIA</option>
            <option value="IRAN, ISLAMIC REPUBLIC OF">
              IRAN, ISLAMIC REPUBLIC OF
            </option>
            <option value="IRAQ">IRAQ</option>
            <option value="IRELAND">IRELAND</option>
            <option value="ISRAEL">ISRAEL</option>
            <option value="ITALY">ITALY</option>
            <option value="JAMAICA">JAMAICA</option>
            <option value="JAPAN">JAPAN</option>
            <option value="JORDAN">JORDAN</option>
            <option value="KAZAKHSTAN">KAZAKHSTAN</option>
            <option value="KENYA">KENYA</option>
            <option value="KIRIBATI">KIRIBATI</option>
            <option value="KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF">
              KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF
            </option>
            <option value="KOREA, REPUBLIC OF">KOREA, REPUBLIC OF</option>
            <option value="KOSOVO">KOSOVO</option>
            <option value="KUWAIT">KUWAIT</option>
            <option value="KYRGYZSTAN">KYRGYZSTAN</option>
            <option value="LAO PEOPLE'S DEMOCRATIC REPUBLIC">
              LAO PEOPLE'S DEMOCRATIC REPUBLIC
            </option>
            <option value="LATVIA">LATVIA</option>
            <option value="LEBANON">LEBANON</option>
            <option value="LESOTHO">LESOTHO</option>
            <option value="LIBERIA">LIBERIA</option>
            <option value="LIBYAN ARAB JAMAHIRIYA">
              LIBYAN ARAB JAMAHIRIYA
            </option>
            <option value="LITHUANIA">LITHUANIA</option>
            <option value="LUXEMBOURG">LUXEMBOURG</option>
            <option value="MADAGASCAR">MADAGASCAR</option>
            <option value="MALAWI">MALAWI</option>
            <option value="MALAYSIA">MALAYSIA</option>
            <option value="MALDIVES">MALDIVES</option>
            <option value="MALI">MALI</option>
            <option value="MARSHALL ISLANDS">MARSHALL ISLANDS</option>
            <option value="MAURITANIA">MAURITANIA</option>
            <option value="MAURITIUS">MAURITIUS</option>
            <option value="MICRONESIA, FEDERATED STATES OF">
              MICRONESIA, FEDERATED STATES OF
            </option>
            <option value="MOLDOVA, REPUBLIC OF">MOLDOVA, REPUBLIC OF</option>
            <option value="MONGOLIA">MONGOLIA</option>
            <option value="MONTENEGRO">MONTENEGRO</option>
            <option value="MOROCCO">MOROCCO</option>
            <option value="MOZAMBIQUE">MOZAMBIQUE</option>
            <option value="MYANMAR">MYANMAR</option>
            <option value="NAMIBIA">NAMIBIA</option>
            <option value="NEPAL">NEPAL</option>
            <option value="NETHERLANDS">NETHERLANDS</option>
            <option value="NEW ZEALAND">NEW ZEALAND</option>
            <option value="NICARAGUA">NICARAGUA</option>
            <option value="NIGER">NIGER</option>
            <option value="NIGERIA">NIGERIA</option>
            <option value="NORWAY">NORWAY</option>
            <option value="OMAN">OMAN</option>
            <option value="PAKISTAN">PAKISTAN</option>
            <option value="PANAMA">PANAMA</option>
            <option value="PAPUA NEW GUINEA">PAPUA NEW GUINEA</option>
            <option value="PARAGUAY">PARAGUAY</option>
            <option value="PERU">PERU</option>
            <option value="PHILIPPINES">PHILIPPINES</option>
            <option value="POLAND">POLAND</option>
            <option value="PORTUGAL">PORTUGAL</option>
            <option value="QATAR">QATAR</option>
            <option value="ROMANIA">ROMANIA</option>
            <option value="RUSSIAN FEDERATION">RUSSIAN FEDERATION</option>
            <option value="RWANDA">RWANDA</option>
            <option value="SAINT HELENA">SAINT HELENA</option>
            <option value="SAMOA">SAMOA</option>
            <option value="SAO TOME AND PRINCIPE">SAO TOME AND PRINCIPE</option>
            <option value="SAUDI ARABIA">SAUDI ARABIA</option>
            <option value="SENEGAL">SENEGAL</option>
            <option value="SERBIA">SERBIA</option>
            <option value="SIERRA LEONE">SIERRA LEONE</option>
            <option value="SLOVAKIA">SLOVAKIA</option>
            <option value="SLOVENIA">SLOVENIA</option>
            <option value="SOLOMON ISLANDS">SOLOMON ISLANDS</option>
            <option value="SOMALIA">SOMALIA</option>
            <option value="SOUTH AFRICA">SOUTH AFRICA</option>
            <option value="SPAIN">SPAIN</option>
            <option value="SRI LANKA">SRI LANKA</option>
            <option value="SUDAN">SUDAN</option>
            <option value="SURINAME">SURINAME</option>
            <option value="SWAZILAND">SWAZILAND</option>
            <option value="SWEDEN">SWEDEN</option>
            <option value="SWITZERLAND">SWITZERLAND</option>
            <option value="SYRIAN ARAB REPUBLIC">SYRIAN ARAB REPUBLIC</option>
            <option value="TAIWAN, PROVINCE OF CHINA">
              TAIWAN, PROVINCE OF CHINA
            </option>
            <option value="TAJIKISTAN">TAJIKISTAN</option>
            <option value="TANZANIA, UNITED REPUBLIC OF">
              TANZANIA, UNITED REPUBLIC OF
            </option>
            <option value="THAILAND">THAILAND</option>
            <option value="TIMOR-LESTE">TIMOR-LESTE</option>
            <option value="TOGO">TOGO</option>
            <option value="TRINIDAD AND TOBAGO">TRINIDAD AND TOBAGO</option>
            <option value="TUNISIA">TUNISIA</option>
            <option value="TURKEY">TURKEY</option>
            <option value="TURKMENISTAN">TURKMENISTAN</option>
            <option value="UGANDA">UGANDA</option>
            <option value="UKRAINE">UKRAINE</option>
            <option value="UNITED ARAB EMIRATES">UNITED ARAB EMIRATES</option>
            <option value="UNITED STATES MINOR OUTLYING ISLANDS">
              UNITED STATES MINOR OUTLYING ISLANDS
            </option>
            <option value="URUGUAY">URUGUAY</option>
            <option value="UZBEKISTAN">UZBEKISTAN</option>
            <option value="VANUATU">VANUATU</option>
            <option value="VENEZUELA">VENEZUELA</option>
            <option value="VIETNAM">VIETNAM</option>
            <option value="YEMEN">YEMEN</option>
            <option value="ZAMBIA">ZAMBIA</option>
            <option value="ZIMBABWE">ZIMBABWE</option>
          </select>
          {errors.countryCode && (
            <p className="text-red-500 text-sm">{errors.countryCode}</p>
          )}
        </div>
        <div className="col-span-2">
          <input
            placeholder="TELÉFONO*"
            type="tel"
            id="phone_number"
            className="w-full p-2 outline-none text-left"
            name="phone_number"
            maxLength={13}
            required
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm">{errors.phone_number}</p>
          )}
        </div>
        <div className="col-span-4">
          <input
            placeholder="DIRECCIÓN*"
            type="text"
            id="direction"
            className="w-full p-2 outline-none text-left"
            name="direction"
            required
          />
          {errors.direction && (
            <p className="text-red-500 text-sm">{errors.direction}</p>
          )}
        </div>
        <div className="col-span-2">
          <input
            placeholder="CIUDAD*"
            type="text"
            id="city"
            className="w-full p-2 outline-none text-left"
            name="city"
            required
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        <div className="col-span-1">
          <input
            placeholder="ESTADO*"
            type="text"
            id="state"
            className="w-full p-2 outline-none text-left"
            name="state"
            required
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}
        </div>
        <div className="col-span-1">
          <input
            placeholder="CÓDIGO POSTAL*"
            type="text"
            id="codigo"
            className="w-full p-2 outline-none text-left"
            name="codigo"
            required
          />
          {errors.codigo && (
            <p className="text-red-500 text-sm">{errors.codigo}</p>
          )}
        </div>
        <div className="col-span-4">
          <textarea
            placeholder="SOLICITUDES ESPECIALES"
            id="solicitudes"
            className="w-full p-2 outline-none text-left"
            name="solicitudes"
            rows={3}
          />
        </div>
      </div>

      {/* Información de pago */}
      <h5
        className="heading text-2xl text-center mb-[10px]"
        style={{ fontFamily: "GreatVibes" }}
      >
        Información de Pago
      </h5>
      <div className="grid gird-cols-2 gap-2 mt-4">
        <div className="col-span-2">
          <input
            placeholder="NOMBRE EN TARJETA*"
            type="text"
            id="name_on_card"
            className="w-full p-2 outline-none text-left"
            name="name_on_card"
            required
          />
          {errors.name_on_card && (
            <p className="text-red-500 text-sm">{errors.name_on_card}</p>
          )}
        </div>
        <div className="col-span-2">
          <input
            placeholder="NÚMERO DE TARJETA*"
            type="text"
            id="number_on_card"
            className="w-full p-2 outline-none text-left"
            name="number_on_card"
            required
            maxLength={19}
            onChange={handleCardNumberChange}
          />
          {errors.number_on_card && (
            <p className="text-red-500 text-sm">{errors.number_on_card}</p>
          )}
        </div>
        <div className="col-span-1">
          <input
            type="text"
            id="cardExpiry"
            name="cardExpiry"
            placeholder="MM/AA*"
            className="w-full p-2 outline-none"
            required
            maxLength={5}
            onChange={handleExpiryChange}
          />
          {errors.cardExpiry && (
            <p className="text-red-500 text-sm">{errors.cardExpiry}</p>
          )}
        </div>
        <div className="col-span-1">
          <input
            placeholder="CVV*"
            type="text"
            id="cardCvv"
            className="w-full p-2 outline-none text-left"
            name="cardCvv"
            required
            maxLength={4}
          />
          {errors.cardCvv && (
            <p className="text-red-500 text-sm">{errors.cardCvv}</p>
          )}
        </div>
      </div>

      {/* Resumen de pago */}
      <div className="grid gap-[10px] text-sm mt-6">
        <div className="total__price flex justify-between items-center border-t-[1px] border-[#e5e5e5] pt-3">
          <span className="total h6 mb-0 text-heading">Total</span>
          {discount > 0 ? (
            <span
              id="price"
              className="price h6 m-0 text-heading text-[#f53d3d] line-through"
            >
              {new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
              }).format(price)}{" "}
              MXN
            </span>
          ) : (
            <span id="price" className="price h6 m-0 text-heading ">
              {new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
              }).format(price)}{" "}
              MXN
            </span>
          )}
        </div>

        <div className="flex justify-between items-center border-t-[1px] border-[#e5e5e5] pt-3">
          <span className="total h6 mb-0 text-heading">Descuento</span>
          <span className="price h6 m-0 text-heading text-green-600 rounded-md">
            {discount}% PROMOCIONAL
          </span>
        </div>

        <div className="flex justify-between items-center border-t-[1px] border-[#e5e5e5] pt-3">
          <span className="total h6 mb-0 text-heading">Precio Final</span>
          <span className="price h6 m-0 text-heading ">
            {discountPrice &&
              new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
              }).format(discountPrice)}{" "}
            MXN
          </span>
        </div>

        <div className="flex justify-center pt-4 pb-6">
          <button
            type="submit"
            className="bg-[#00beba] text-white p-2 rounded-md w-full"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={24} color="#fff" />
            ) : (
              "CONFIRMAR RESERVACIÓN"
            )}
          </button>
        </div>
      </div>

      {/* Modales */}
      {submissionStatus === "success" && (
        <SuccessModal onClose={() => setSubmissionStatus(null)} />
      )}
      {submissionStatus === "error" && (
        <ErrorModal onClose={() => setSubmissionStatus(null)} />
      )}
    </form>
  );
}
