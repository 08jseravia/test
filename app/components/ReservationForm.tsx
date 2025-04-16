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
      <div className="inline-block bg-white bg-opacity-90 rounded-lg p-8">
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
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No se pudo procesar
        </h3>
        <p className="text-gray-600 mb-6">
          No podemos procesar su reservación en este momento. Por favor,
          inténtelo de nuevo más tarde.
        </p>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Entendido
        </button>
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
            <option value="US">UNITED STATES</option>
            <option value="CA">CANADA</option>
            <option value="GB">UNITED KINGDOM</option>
            <option value="MX">MEXICO</option>
            <option value="AF">AFGHANISTAN</option>
            <option value="AL">ALBANIA</option>
            <option value="DZ">ALGERIA</option>
            <option value="AO">ANGOLA</option>
            <option value="AR">ARGENTINA</option>
            <option value="AM">ARMENIA</option>
            <option value="AU">AUSTRALIA</option>
            <option value="AT">AUSTRIA</option>
            <option value="AZ">AZERBAIJAN</option>
            <option value="BS">BAHAMAS</option>
            <option value="BH">BAHRAIN</option>
            <option value="BD">BANGLADESH</option>
            <option value="BY">BELARUS</option>
            <option value="BE">BELGIUM</option>
            <option value="BZ">BELIZE</option>
            <option value="BJ">BENIN</option>
            <option value="BT">BHUTAN</option>
            <option value="BO">BOLIVIA</option>
            <option value="BA">BOSNIA AND HERZEGOVINA</option>
            <option value="BW">BOTSWANA</option>
            <option value="BR">BRAZIL</option>
            <option value="BN">BRUNEI DARUSSALAM</option>
            <option value="BG">BULGARIA</option>
            <option value="BF">BURKINA FASO</option>
            <option value="BI">BURUNDI</option>
            <option value="KH">CAMBODIA</option>
            <option value="CM">CAMEROON</option>
            <option value="CV">CAPE VERDE</option>
            <option value="CF">CENTRAL AFRICAN REPUBLIC</option>
            <option value="TD">CHAD</option>
            <option value="CL">CHILE</option>
            <option value="CN">CHINA</option>
            <option value="CO">COLOMBIA</option>
            <option value="KM">COMOROS</option>
            <option value="CG">CONGO</option>
            <option value="CD">CONGO, THE DEMOCRATIC REPUBLIC OF THE</option>
            <option value="CR">COSTA RICA</option>
            <option value="CI">COTE D&apos;IVOIRE</option>
            <option value="HR">CROATIA</option>
            <option value="CU">CUBA</option>
            <option value="CY">CYPRUS</option>
            <option value="CZ">CZECH REPUBLIC</option>
            <option value="DK">DENMARK</option>
            <option value="DJ">DJIBOUTI</option>
            <option value="DO">DOMINICAN REPUBLIC</option>
            <option value="EC">ECUADOR</option>
            <option value="EG">EGYPT</option>
            <option value="SV">EL SALVADOR</option>
            <option value="GQ">EQUATORIAL GUINEA</option>
            <option value="ER">ERITREA</option>
            <option value="EE">ESTONIA</option>
            <option value="ET">ETHIOPIA</option>
            <option value="FJ">FIJI</option>
            <option value="FI">FINLAND</option>
            <option value="FR">FRANCE</option>
            <option value="GA">GABON</option>
            <option value="GM">GAMBIA</option>
            <option value="GE">GEORGIA</option>
            <option value="DE">GERMANY</option>
            <option value="GH">GHANA</option>
            <option value="GR">GREECE</option>
            <option value="GT">GUATEMALA</option>
            <option value="GN">GUINEA</option>
            <option value="GW">GUINEA-BISSAU</option>
            <option value="GY">GUYANA</option>
            <option value="HT">HAITI</option>
            <option value="HN">HONDURAS</option>
            <option value="HU">HUNGARY</option>
            <option value="IS">ICELAND</option>
            <option value="IN">INDIA</option>
            <option value="ID">INDONESIA</option>
            <option value="IR">IRAN, ISLAMIC REPUBLIC OF</option>
            <option value="IQ">IRAQ</option>
            <option value="IE">IRELAND</option>
            <option value="IL">ISRAEL</option>
            <option value="IT">ITALY</option>
            <option value="JM">JAMAICA</option>
            <option value="JP">JAPAN</option>
            <option value="JO">JORDAN</option>
            <option value="KZ">KAZAKHSTAN</option>
            <option value="KE">KENYA</option>
            <option value="KI">KIRIBATI</option>
            <option value="KP">
              KOREA, DEMOCRATIC PEOPLE&apos;S REPUBLIC OF
            </option>
            <option value="KR">KOREA, REPUBLIC OF</option>
            <option value="XK">KOSOVO</option>
            <option value="KW">KUWAIT</option>
            <option value="KG">KYRGYZSTAN</option>
            <option value="LA">LAO PEOPLE&apos;S DEMOCRATIC REPUBLIC</option>
            <option value="LV">LATVIA</option>
            <option value="LB">LEBANON</option>
            <option value="LS">LESOTHO</option>
            <option value="LR">LIBERIA</option>
            <option value="LY">LIBYAN ARAB JAMAHIRIYA</option>
            <option value="LT">LITHUANIA</option>
            <option value="LU">LUXEMBOURG</option>
            <option value="MG">MADAGASCAR</option>
            <option value="MW">MALAWI</option>
            <option value="MY">MALAYSIA</option>
            <option value="MV">MALDIVES</option>
            <option value="ML">MALI</option>
            <option value="MH">MARSHALL ISLANDS</option>
            <option value="MR">MAURITANIA</option>
            <option value="MU">MAURITIUS</option>
            <option value="FM">MICRONESIA, FEDERATED STATES OF</option>
            <option value="MD">MOLDOVA, REPUBLIC OF</option>
            <option value="MN">MONGOLIA</option>
            <option value="ME">MONTENEGRO</option>
            <option value="MA">MOROCCO</option>
            <option value="MZ">MOZAMBIQUE</option>
            <option value="MM">MYANMAR</option>
            <option value="NA">NAMIBIA</option>
            <option value="NP">NEPAL</option>
            <option value="NL">NETHERLANDS</option>
            <option value="NZ">NEW ZEALAND</option>
            <option value="NI">NICARAGUA</option>
            <option value="NE">NIGER</option>
            <option value="NG">NIGERIA</option>
            <option value="NO">NORWAY</option>
            <option value="OM">OMAN</option>
            <option value="PK">PAKISTAN</option>
            <option value="PA">PANAMA</option>
            <option value="PG">PAPUA NEW GUINEA</option>
            <option value="PY">PARAGUAY</option>
            <option value="PE">PERU</option>
            <option value="PH">PHILIPPINES</option>
            <option value="PL">POLAND</option>
            <option value="PT">PORTUGAL</option>
            <option value="QA">QATAR</option>
            <option value="RO">ROMANIA</option>
            <option value="RU">RUSSIAN FEDERATION</option>
            <option value="RW">RWANDA</option>
            <option value="SH">SAINT HELENA</option>
            <option value="WS">SAMOA</option>
            <option value="ST">SAO TOME AND PRINCIPE</option>
            <option value="SA">SAUDI ARABIA</option>
            <option value="SN">SENEGAL</option>
            <option value="RS">SERBIA</option>
            <option value="SL">SIERRA LEONE</option>
            <option value="SK">SLOVAKIA</option>
            <option value="SI">SLOVENIA</option>
            <option value="SB">SOLOMON ISLANDS</option>
            <option value="SO">SOMALIA</option>
            <option value="ZA">SOUTH AFRICA</option>
            <option value="ES">SPAIN</option>
            <option value="LK">SRI LANKA</option>
            <option value="SD">SUDAN</option>
            <option value="SR">SURINAME</option>
            <option value="SZ">SWAZILAND</option>
            <option value="SE">SWEDEN</option>
            <option value="CH">SWITZERLAND</option>
            <option value="SY">SYRIAN ARAB REPUBLIC</option>
            <option value="TW">TAIWAN, PROVINCE OF CHINA</option>
            <option value="TJ">TAJIKISTAN</option>
            <option value="TZ">TANZANIA, UNITED REPUBLIC OF</option>
            <option value="TH">THAILAND</option>
            <option value="TL">TIMOR-LESTE</option>
            <option value="TG">TOGO</option>
            <option value="TT">TRINIDAD AND TOBAGO</option>
            <option value="TN">TUNISIA</option>
            <option value="TR">TURKEY</option>
            <option value="TM">TURKMENISTAN</option>
            <option value="UG">UGANDA</option>
            <option value="UA">UKRAINE</option>
            <option value="AE">UNITED ARAB EMIRATES</option>
            <option value="UM">UNITED STATES MINOR OUTLYING ISLANDS</option>
            <option value="UY">URUGUAY</option>
            <option value="UZ">UZBEKISTAN</option>
            <option value="VU">VANUATU</option>
            <option value="VE">VENEZUELA</option>
            <option value="VN">VIETNAM</option>
            <option value="YE">YEMEN</option>
            <option value="ZM">ZAMBIA</option>
            <option value="ZW">ZIMBABWE</option>
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
