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
}

interface FormErrors {
  check__in?: string;
  check__out?: string;
  adult?: string;
  email?: string;
  phone?: string;
}

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

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(
      formData.entries()
    ) as any as Reservation;

    const validationErrors = validateForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      // Prepare the email content
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
                    <p><strong>Descuento :</strong>${discount} %</p>
                    <p><strong>Precio Total:</strong> ${new Intl.NumberFormat(
                      "es-MX",
                      { style: "currency", currency: "MXN" }
                    ).format(discountPrice)} MXN</p>
                </div>
                <div class="footer">
                    <p>Gracias por elegirnos. ¡Esperamos verte pronto!</p>
                </div>
            </div>
        </body>
        </html>
      `;

      // Send the email via the API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_ADMIN_EMAIL, // Replace with the admin email
          subject: `Nueva Reservación: ${room?.name}`,
          html: emailContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Reset form fields (optional)
      setCheckIn(new Date().toISOString().split("T")[0]);
      setCheckOut(new Date().toISOString().split("T")[0]);
      setNumberOfPeople(room.person === 2 ? 1 : 2);
      e?.currentTarget?.reset(); // Reset the form

      // Show success message
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value; // YYYY-MM-DD
    const formattedDate = new Date(inputDate).toISOString().split("T")[0]; // Ensures YYYY-MM-DD format
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
          <div className="relative min-w-[160px]">
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
          <div className="relative min-w-[160px]">
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
          <div className="relative min-w-[160px]">
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
          <div className="relative min-w-[160px]">
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
          <div className="relative min-w-[160px]">
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
              "Confirmar reserva"
            )}
          </button>
        </div>

        {/* Submission Message */}
        {submissionStatus === "success" && (
          <div className="text-center text-green-600">
            Reservación enviada con éxito. Nos pondremos en contacto contigo
            pronto.
          </div>
        )}
        {submissionStatus === "error" && (
          <div className="text-center text-red-500">
            Hubo un error al enviar la reservación. Por favor, inténtalo de
            nuevo.
          </div>
        )}
      </div>
    </form>
  );
}
