"use client";

interface Props {
  lat: number;
  lng: number;
  label: string;
}

export default function LocationMap({ lat, lng, label }: Props) {
  // Google Maps embed — shows marker with place name, no API key needed for basic embed
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

  return (
    <div className="relative w-full h-full">
      <iframe
        title={label}
        src={src}
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
