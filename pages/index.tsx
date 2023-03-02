import DatamatrixBarcode from "@/components/DatamatrixBarcode/DatamatrixBarcode";
import GermanVisa from "@/components/Seals/GermanVisa";

export default function Home() {
  return (
    <>
      <GermanVisa />
      <DatamatrixBarcode content={new Uint8Array()} />
    </>
  );
}
