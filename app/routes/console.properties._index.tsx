import { Button } from "@nextui-org/react";
import { useNavigate } from "@remix-run/react";

export default function PropertiesIndex() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between">
        <Button onPress={() => navigate("/console/properties/create")}>
          New Property
        </Button>
      </div>
      <h1>Properties Index</h1>
    </div>
  );
}
