"use client";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

interface Room {
  person: number;
  prices: {
    high: number;
    low: number;
  };
  // Add other properties of room here
}

interface Reservation {
  check__in: string; // Date in string format
  check__out: string; // Date in string format
  adult: string; // Assuming adult count is stored as string
  email: string; // Email address
  phone: string; // Phone number
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
  const [price, setPrice] = useState<number>(room?.prices?.high || 0); // Ensuring number type
  const [discountPrice, setDiscountPrice] = useState<number>(0); // Ensuring number type
  const [bookingDays, setBookingDays] = useState(1);
  const [checkIn, setCheckIn] = useState<string>(
    `${new Date().toISOString().split("T")[0]}`
  );
  const [checkOut, setCheckOut] = useState<string>(
    `${new Date().toISOString().split("T")[0]}`
  );

  useEffect(() => {
    setCheckIn(`${new Date().toISOString().split("T")[0]}`);
    setCheckOut(`${new Date().toISOString().split("T")[0]}`);
    setPrice(room?.prices?.high || 0); // Fallback if `high` price is undefined
    setDiscountPrice(
      (prev) =>
        discount && discount != null && discount != undefined
          ? room?.prices?.high - (room?.prices?.high * discount) / 100
          : room?.prices?.high || 0 // Ensuring fallback value if `high` is undefined
    );
  }, [room?.prices?.high]);

  const options = Array.from({ length: room?.person }, (_, index) => index + 1);

  const updatePrice = () => {
    if (!checkIn || !checkOut) {
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (
      isNaN(checkInDate.getTime()) ||
      isNaN(checkOutDate.getTime()) ||
      checkOutDate <= checkInDate
    ) {
      return;
    }

    // Calculate the number of nights
    const days = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24) +
        1
    );
    setBookingDays(days);
    const pricePerNight = room?.prices?.high || 0; // Ensure fallback value
    const totalPrice = days * pricePerNight;

    // Apply discount if available
    const finalPrice =
      discount && discount != null && discount != undefined
        ? totalPrice - (totalPrice * discount) / 100
        : totalPrice;

    setDiscountPrice(finalPrice);
  };

  // Call updatePrice whenever checkIn, checkOut, or discount changes
  useEffect(() => {
    updatePrice();
  }, [checkIn, checkOut, discount]);

  const validateForm = (formData: Reservation) => {
    const newErrors: FormErrors = {};

    // Check In Date Validation
    if (!formData.check__in) {
      newErrors.check__in = "Check-in date is required.";
    } else if (new Date(formData.check__in) < new Date("2025-01-28")) {
      newErrors.check__in = "Check-in date must be after 2025-01-28.";
    }

    // Check Out Date Validation
    if (!formData.check__out) {
      newErrors.check__out = "Check-out date is required.";
    } else if (new Date(formData.check__out) < new Date(formData.check__in)) {
      newErrors.check__out = "Check-out date must be after check-in date.";
    }

    // Adult Validation
    if (!formData.adult) {
      newErrors.adult = "Number of adults is required.";
    }

    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    // Phone Validation
    if (!formData.phone) {
      newErrors.phone = "El número de teléfono es obligatorio.";
    } else if (!/^\d{10,13}$/.test(formData.phone)) {
      newErrors.phone =
        "El número de teléfono debe tener entre 10 y 13 dígitos.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());

    const validationErrors = validateForm(formValues as any as Reservation);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    setErrors({});
    // Introduce a 1.5-second delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // If no errors, submit the form
    console.log("Form submitted successfully:", formValues);
    setLoading(false);
    // You can add your form submission logic here (e.g., API call)
  };

  return (
    <form id="reservationForm" method="post" onSubmit={handleSubmit}>
      <div className="grid gap-[20px] text-sm">
        {/* Check In */}
        <div className="flex justify-between relative w-full p-[14px_20px] bg-white rounded-[6px]">
          <label
            htmlFor="check__in"
            className="block text-sm font-glida text-heading "
          >
            Check In
          </label>
          <div className="relative min-w-[160px] max-w-[160px]">
            <input
              type="date"
              id="check_in"
              className="relative z-10 w-[100%] ml-[20px] bg-white appearance-none p-[0_5px] outline-none"
              name="check__in"
              required
              min={`${new Date().toISOString().split("T")[0]}`}
              value={checkIn}
              onChange={(val) => {
                setCheckIn(val.target.value);
              }}
            />
            {errors.check__in && (
              <p className="text-red-500 text-sm">{errors.check__in}</p>
            )}
          </div>
        </div>

        {/* Check Out */}
        <div className="flex justify-between relative w-full p-[14px_20px] bg-white rounded-[6px]">
          <label
            htmlFor="check__out"
            className="block text-sm font-glida text-heading "
          >
            Check Out
          </label>
          <div className="relative min-w-[160px] max-w-[160px]">
            <input
              type="date"
              id="check_out"
              name="check__out"
              className="relative z-10 w-[100%] ml-[20px] bg-white appearance-none p-[0_5px] outline-none"
              required
              min={`${new Date().toISOString().split("T")[0]}`}
              value={checkOut}
              onChange={(val) => {
                setCheckOut(val.target.value);
              }}
            />
            {errors.check__out && (
              <p className="text-red-500 text-sm">{errors.check__out}</p>
            )}
          </div>
        </div>

        {/* Adult */}
        <div className="flex justify-between relative w-full p-[14px_20px] bg-white rounded-[6px]">
          <label
            htmlFor="adult"
            className="block text-sm font-glida text-heading "
          >
            Adulto
          </label>
          <div className="relative min-w-[160px] max-w-[160px]">
            <select
              name="adult"
              id="adult"
              className="relative z-10 w-[100%] ml-[20px] bg-white appearance-none p-[0_5px] outline-none"
            >
              {options.map((option) => (
                <option key={option} value={option}>
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
        <div className="flex justify-between relative w-full p-[14px_20px] bg-white rounded-[6px]">
          <label
            htmlFor="email"
            className="block text-sm font-glida text-heading"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Escribe tu correo"
            className="relative z-10 w-[100%] ml-[20px] bg-white appearance-none p-[0_5px] outline-none"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex justify-between relative w-full p-[14px_20px] bg-white rounded-[6px]">
          <label
            htmlFor="phone"
            className="block text-sm font-glida text-heading "
          >
            Número de Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Número de Teléfono"
            className="relative z-10 w-[100%] ml-[20px] bg-white appearance-none p-[0_5px] outline-none"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Total Price */}
        <div className="total__price flex justify-between border-t-[1px] border-[#e5e5e5]">
          <span className="total h6 mb-0 text-heading">Total</span>
          <span id="price" className="price h6 m-0 text-heading">
            {new Intl.NumberFormat("es-MX", {
              style: "currency",
              currency: "MXN",
            }).format(price * bookingDays)}
          </span>
        </div>

        {/* Discount */}
        <div className="flex justify-between border-t-[1px] border-[#e5e5e5]">
          <span className="total h6 mb-0 text-heading">Descuento</span>
          <span id="price" className="price h6 m-0 text-heading text-[#f53d3d]">
            {discountPrice &&
              new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
              }).format(discountPrice)}
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
      </div>
    </form>
  );
}
