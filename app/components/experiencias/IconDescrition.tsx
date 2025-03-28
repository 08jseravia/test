import Image from "next/image";

export default function IconDescription({
  href,
  description,
}: {
  href: string;
  description: string;
}) {
  return (
    <div className="p-4 text-center text-wrap max-w-60">
      <Image
        src={href}
        alt={href}
        width={60}
        height={60}
        className="mx-auto mb-6"
      />
      <p>{description}</p>
    </div>
  );
}
