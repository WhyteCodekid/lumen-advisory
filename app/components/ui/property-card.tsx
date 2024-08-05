import { Link, useNavigate } from "@remix-run/react";
import { PropertyInterface } from "~/types";
import { MapMarkerAnimated } from "../icons/map";
import { BathTub, Bed, Wifi } from "../icons/amenities";

export default function PropertyCard({
  property,
}: {
  property: PropertyInterface;
}) {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="border-b-2 pb-4 border-slate-300/40 dark:border-white/5">
        <button
          onClick={() => navigate(`/properties/${property._id}`)}
          className="rounded-2xl overflow-hidden h-40 md:h-60 !outline-none !ring-0"
        >
          <img
            src={`/uploaded_files/images/${
              property?.images && property?.images[0]
            }`}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-110 duration-300 transition-transform"
          />
        </button>
        {/* location */}
        <div className="flex items-center gap-2 mb-2">
          <MapMarkerAnimated />
          <p className="text-xs uppercase font-nunito">{property.location}</p>
        </div>
        {/* property title */}
        <Link
          to={`/properties/${property._id}`}
          className="font-poppins font-medium text-slate-950 dark:text-white text-3xl"
        >
          {property.title}
        </Link>
        {/* description */}
        <p className="font-nunito text-slate-700 dark:text-slate-200">
          {property.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4">
        <h4 className="font-montserrat font-semibold text-2xl">
          $ {property.price}
        </h4>

        {/* amenities */}
        <div className="flex items-end gap-2">
          <Wifi className="size-6" />{" "}
          <span className="mr-2 text-xs font-nunito">
            {property.indoorFeatures.wifi ? "Yes" : "No"}
          </span>
          <Bed className="size-6" />{" "}
          <span className="mr-2 text-xs font-nunito">{property.bedrooms}</span>
          <BathTub className="size-6" />{" "}
          <span className="mr-2 text-xs font-nunito">{property.bathrooms}</span>
        </div>
      </div>
    </div>
  );
}
