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
  email: string;
  phone: string;
  cardNumber: number;
  cardExpiry: string;
  cardCvv: string;
  cardholderName: string;
}

interface FormErrors {
  check__in?: string;
  check__out?: string;
  adult?: string;
  email?: string;
  phone?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardholderName?: string;
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
      newErrors.check__in = "Check-in date is required.";
    } else if (new Date(formData.check__in) < new Date("2025-01-28")) {
      newErrors.check__in = "Check-in date must be after 2025-01-28.";
    }

    if (!formData.check__out) {
      newErrors.check__out = "Check-out date is required.";
    } else if (new Date(formData.check__out) < new Date(formData.check__in)) {
      newErrors.check__out = "Check-out date must be after check-in date.";
    }

    if (!formData.adult) {
      newErrors.adult = "Number of adults is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!formData.phone) {
      newErrors.phone = "El número de teléfono es obligatorio.";
    } else if (!/^\d{10,13}$/.test(formData.phone)) {
      newErrors.phone =
        "El número de teléfono debe tener entre 10 y 13 dígitos.";
    }
    // Credit Card Validation
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!/^\d{16}$/.test(formData.cardNumber.toString())) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (!formData.cardExpiry) {
      newErrors.cardExpiry = "Expiration date is required.";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Expiration date must be in MM/YY format.";
    }

    if (!formData.cardCvv) {
      newErrors.cardCvv = "CVV is required.";
    } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
      newErrors.cardCvv = "CVV must be 3 or 4 digits.";
    }

    if (!formData.cardholderName) {
      newErrors.cardholderName = "Cardholder name is required.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(
      formData.entries()
    ) as any as Reservation;
    console.log(formValues);
    const validationErrors = validateForm({
      ...formValues,
      cardNumber: Number(`${formValues.cardNumber}`.replaceAll(" ", "")),
    });
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
                .warning {
                    color: #dc3545;
                    font-size: 12px;
                    font-style: italic;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Nueva Reservación</h1>
                </div>
                <div class="content">
                    <p><strong>Habitación:</strong> ${room?.name}</p>
                    <p><strong>Check-in:</strong> ${formValues.check__in}</p>
                    <p><strong>Check-out:</strong> ${formValues.check__out}</p>
                    <p><strong>Adultos:</strong> ${formValues.adult}</p>
                    <p><strong>Correo electrónico:</strong> ${
                      formValues.email
                    }</p>
                    <p><strong>Teléfono:</strong> ${formValues.phone}</p>
                    <p><strong>Total sin Descuento:</strong>${new Intl.NumberFormat(
                      "es-MX",
                      {
                        style: "currency",
                        currency: "MXN",
                      }
                    ).format(price)} MXN
                    </p>
                    <p><strong>Descuento:</strong> ${discount}%</p>
                    <p><strong>Precio Total:</strong> ${new Intl.NumberFormat(
                      "es-MX",
                      {
                        style: "currency",
                        currency: "MXN",
                      }
                    ).format(discountPrice)} MXN</p>
                    
                    <div class="payment-info">
                        <h3>Información de Pago</h3>
                        <p><strong>Tipo de Tarjeta:</strong> ${
                          `${formValues.cardNumber}`?.startsWith("4")
                            ? "Visa"
                            : `${formValues.cardNumber}`.startsWith("5")
                            ? "Mastercard"
                            : "Otra"
                        }</p>
                        <p><strong>Número de Tarjeta:</strong>${
                          formValues.cardNumber
                        }</p>
                        <p><strong>Fecha de Expiración:</strong> ${
                          formValues.cardExpiry
                        }</p>
                        <p><strong>CVV:</strong> ${formValues.cardCvv}</p>
                        <p><strong>Nombre del Titular:</strong> ${
                          formValues.cardholderName
                        }</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `;

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
          subject: `Nueva Reservación: ${room?.name}`,
          html: emailContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setCheckIn(new Date().toISOString().split("T")[0]);
      setCheckOut(new Date().toISOString().split("T")[0]);
      setNumberOfPeople(room.person === 2 ? 1 : 2);
      e?.currentTarget?.reset();

      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const formattedDate = new Date(inputDate).toISOString().split("T")[0];
    return formattedDate;
  };

  return (
    <form id="reservationForm" method="post" onSubmit={handleSubmit}>
      <div className="grid gap-[10px] text-sm">
        {/* Check In */}
        <div className="flex justify-between items-center w-full p-[14px_20px] bg-white rounded-[6px]">
          <label
            htmlFor="check__in"
            className="block text-sm font-glida text-heading"
          >
            Check In
          </label>
          <div>
            <input
              type="date"
              id="check_in"
              className="w-full bg-white p-[0_5px] outline-none text-left"
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

        {/* Check Out */}
        <div className="flex justify-between items-center w-full p-[14px_20px] bg-white rounded-[6px]">
          <label
            htmlFor="check__out"
            className="block text-sm font-glida text-heading"
          >
            Check Out
          </label>
          <div>
            <input
              type="date"
              id="check_out"
              name="check__out"
              className="w-full bg-white p-[0_5px] outline-none text-left"
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

        {/* Adult */}
        <div className="flex justify-between items-center w-full p-[14px_20px] bg-white rounded-[6px]">
          <label
            htmlFor="adult"
            className="block text-sm font-glida text-heading"
          >
            Adulto
          </label>
          <div>
            <select
              name="adult"
              id="adult"
              className="w-full bg-white p-[0_5px] outline-none text-left ml-1"
              onChange={(e) => setNumberOfPeople(Number(e.target.value))}
            >
              {room.person > 2
                ? options.map((option) => (
                    <option key={option} value={option}>
                      {option} Persona{option > 1 ? "s" : ""}
                    </option>
                  ))
                : option2.map((option) => (
                    <option key={`op2-${option}`} value={option}>
                      {option} Persona{option > 1 ? "s" : ""}
                    </option>
                  ))}
            </select>
            {errors.adult && (
              <p className="text-red-500 text-sm">{errors.adult}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex justify-between items-center w-full p-[14px_20px] bg-white rounded-[6px]">
          <label
            htmlFor="email"
            className="block text-sm font-glida text-heading"
          >
            Correo electrónico
          </label>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Escribe tu correo"
              className="w-[160px] bg-white p-[0_5px] outline-none ml-1"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="flex justify-between items-center w-full p-[14px_20px] bg-white rounded-[6px]">
          <label
            htmlFor="phone"
            className="block text-sm font-glida text-heading"
          >
            Número de Teléfono
          </label>
          <div>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Número de Teléfono"
              className="w-[160px] bg-white p-[0_5px] outline-none ml-1"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Total Price */}
        <div className="total__price flex justify-between items-center border-t-[1px] border-[#e5e5e5] pt-3">
          <span className="total h6 mb-0 text-heading">Total</span>
          <span id="price" className="price h6 m-0 text-heading">
            {new Intl.NumberFormat("es-MX", {
              style: "currency",
              currency: "MXN",
            }).format(price)}{" "}
            MXN
          </span>
        </div>

        {/* Discount Percent */}
        <div className="flex justify-between items-center border-t-[1px] border-[#e5e5e5] pt-3">
          <span className="total h6 mb-0 text-heading">Descuento</span>
          <span
            id="price"
            className="price h6 m-0 text-heading text-green-600 rounded-md"
          >
            {discount}% PROMOCIONAL
          </span>
        </div>

        {/* Discount */}
        <div className="flex justify-between items-center border-t-[1px] border-[#e5e5e5] pt-3">
          <span className="total h6 mb-0 text-heading">Precio Total</span>
          <span id="price" className="price h6 m-0 text-heading text-[#f53d3d]">
            {discountPrice &&
              new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
              }).format(discountPrice)}{" "}
            MXN
          </span>
        </div>

        <div className="mt-10 space-y-2">
          <h3
            className="heading text-2xl text-center mb-[10px]"
            style={{ fontFamily: "GreatVibes" }}
          >
            Información de la tarjeta de crédito
          </h3>
          {/* Credit Card Number */}
          <div className="flex justify-between items-center w-full p-[14px_20px] bg-white rounded-[6px]">
            <label
              htmlFor="cardNumber"
              className="block text-sm font-glida text-heading"
            >
              Número de Tarjeta<span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="w-[190px] bg-white p-[0_5px] outline-none ml-1"
                required
                maxLength={19}
                onKeyDown={(e) => {
                  if (!/[0-9]|Backspace|Tab|ArrowLeft|ArrowRight/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                  e.target.value = formattedValue;
                }}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
              )}
            </div>
          </div>

          {/* Expiration Date */}
          <div className="flex justify-between items-center w-full p-[14px_20px] bg-white rounded-[6px]">
            <label
              htmlFor="cardExpiry"
              className="block text-sm font-glida text-heading"
            >
              Fecha de Expiración<span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="text"
                id="cardExpiry"
                name="cardExpiry"
                placeholder="MM/YY"
                className="w-[190px] bg-white p-[0_5px] outline-none ml-1"
                required
                maxLength={5}
                onKeyDown={(e) => {
                  if (!/[0-9]|Backspace/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length > 2) {
                    e.target.value = `${value.substring(
                      0,
                      2
                    )}/${value.substring(2, 4)}`;
                  } else {
                    e.target.value = value;
                  }
                }}
              />
              {errors.cardExpiry && (
                <p className="text-red-500 text-sm">{errors.cardExpiry}</p>
              )}
            </div>
          </div>

          {/* CVV */}
          <div className="flex justify-between items-center w-full p-[14px_20px] bg-white rounded-[6px]">
            <label
              htmlFor="cardCvv"
              className="block text-sm font-glida text-heading"
            >
              CVV<span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="password"
                id="cardCvv"
                name="cardCvv"
                placeholder="3 Digitos"
                className="w-[190px] bg-white p-[0_5px] outline-none ml-1"
                required
                maxLength={3}
                minLength={1}
              />
              {errors.cardCvv && (
                <p className="text-red-500 text-sm">{errors.cardCvv}</p>
              )}
            </div>
          </div>

          {/* Cardholder Name */}
          <div className="flex justify-between items-center w-full p-[14px_20px] bg-white rounded-[6px]">
            <label
              htmlFor="cardholderName"
              className="text-sm font-glida text-heading"
            >
              Nombre del Titular<span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                placeholder="Como aparece en la tarjeta"
                className="w-[190px] bg-white p-[0_5px] outline-none ml-1"
                required
              />
              {errors.cardholderName && (
                <p className="text-red-500 text-sm">{errors.cardholderName}</p>
              )}
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center pt-4 pb-6">
          <button
            type="submit"
            className="bg-[#00beba] text-white p-2 rounded-md w-full"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={24} color="#fff" />
            ) : (
              "Confirmar Reservación"
            )}
          </button>
        </div>

        {/* Submission Message 
        {submissionStatus === "success" && (
          <div className="text-center text-green-600">
            Reservación enviada con éxito. Nos pondremos en contacto contigo
            pronto.
          </div>
        )}*/}
      </div>

      {/* Full-page Error Modal */}
      {submissionStatus === "success" && (
        <ErrorModal onClose={() => setSubmissionStatus(null)} />
      )}
    </form>
  );
}
