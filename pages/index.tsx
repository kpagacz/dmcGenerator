import DatamatrixBarcode from '@/pages/Canvas/Canvas'
import GermanVisa from './Seals/GermanVisa'

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello</h1>
      <DatamatrixBarcode content={ new Uint8Array} />
      <GermanVisa />
    </>
  )
}
