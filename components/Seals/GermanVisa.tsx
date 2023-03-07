import C40 from "@/lib/seal/C40";
import DateEncoder from "@/lib/seal/DateEncoder";
import SealEncoder from "@/lib/seal/SealEncoder";
import Visa from "@/lib/types/Visa";
import { useState } from "react";

export default function GermanVisa() {
  const [inputs, setInputs] = useState<Visa>({} as Visa);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs);

    const sealEncoder = new SealEncoder();
    let encodedSeal = sealEncoder.encodeVisaToUTF8(inputs);
    const hex = Buffer.from(encodedSeal).toString("hex");
    console.log(hex);
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">German Visa form</h1>
      <form
        className="w-full max-w-xl flex-row space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="items-center">
          <label htmlFor="magicConstant">Magic constant:</label>
          <input
            type="number"
            id="magicConstant"
            name="magicConstant"
            onChange={handleChange}
          />
        </div>

        <div className="items-center">
          <label htmlFor="version">Version:</label>
          <input
            type="number"
            id="version"
            name="version"
            onChange={handleChange}
          />
        </div>

        <div className="items-center">
          <label htmlFor="countryId">Country ID:</label>
          <input
            type="text"
            id="countryId"
            name="countryId"
            onChange={handleChange}
          />
        </div>

        <div className="items-center">
          <label htmlFor="signer">Signer:</label>
          <input
            type="text"
            id="signer"
            name="signer"
            onChange={handleChange}
          />
        </div>

        <div className="items-center">
          <label htmlFor="certificateReference">Certificate reference:</label>
          <input
            type="number"
            id="certificateReference"
            name="certificateReference"
            onChange={handleChange}
          />
        </div>

        <div className="items-center">
          <label htmlFor="documentIssueDate">Document issue date:</label>
          <input
            type="date"
            id="documentIssueDate"
            name="documentIssueDate"
            onChange={handleChange}
          />
        </div>

        <div className="items-center">
          <label htmlFor="signatureCreationDate">
            Signature creation date:
          </label>
          <input
            type="date"
            id="signatureCreationDate"
            name="signatureCreationDate"
            onChange={handleChange}
          />
        </div>

        <div className="items-center">
          <label htmlFor="documentFeatureDefinitionReference">
            Document Feature Definition Reference:
          </label>
          <input
            type="number"
            id="documentFeatureDefinitionReference"
            name="documentFeatureDefinitionReference"
            onChange={handleChange}
          />
        </div>

        <div className="items-center">
          <label htmlFor="documentTypeCategory">Document Type Category:</label>
          <input
            type="number"
            id="documentTypeCategory"
            name="documentTypeCategory"
            onChange={handleChange}
          />
        </div>

        <button className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none">
          Submit
        </button>
      </form>
    </>
  );
}
