import SealEncoder from "@/lib/seal/SealEncoder";
import Visa from "@/lib/types/Visa";
import DocumentFeature from "@/lib/types/DocumentFeature";
import { useState, MouseEvent } from "react";

export default function GermanVisa() {
  const [headerInput, setHeaderInputs] = useState<Visa>({} as Visa);
  const [documentFeatures, setDocumentFeatures] = useState<
    { id: number; feature: DocumentFeature }[]
  >([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setHeaderInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(headerInput);

    const sealEncoder = new SealEncoder();

    let visa = headerInput
    visa.documentFeatures = [...documentFeatures.map((feature) => feature.feature)]
    console.log(
      Buffer.from(sealEncoder.encodeVisa(visa)).toString("hex")
    );
  };

  const handleAddDocumentFeature = (event: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    console.log("Add feature");
    setDocumentFeatures([
      ...documentFeatures,
      {
        id: Math.random(),
        feature: {
          tag: 0,
          length: 0,
          value: "",
        },
      },
    ]);
  };

  const removeFeature = (index: number) => {
    return (event: MouseEvent<HTMLButtonElement>) => {
      event?.preventDefault();
      console.log("Remove feature index: " + index);
      setDocumentFeatures(
        documentFeatures.filter((feature) => feature.id !== index)
      );
    };
  };

  const handleFeatureTagChange = (index: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const newDocumentFeatures = [...documentFeatures];
      const feature = newDocumentFeatures.find(
        (feature) => feature.id === index
      );
      if (feature) {
        feature.feature.tag = Number(value);
        setDocumentFeatures(newDocumentFeatures);
      }
    };
  };

  const handleFeatureLengthChange = (index: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const newDocumentFeatures = [...documentFeatures];
      const feature = newDocumentFeatures.find(
        (feature) => feature.id === index
      );
      if (feature) {
        feature.feature.length = Number(value);
        setDocumentFeatures(newDocumentFeatures);
      }
    };
  };

  const handleFeatureValueChange = (index: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const newDocumentFeatures = [...documentFeatures];
      const feature = newDocumentFeatures.find(
        (feature) => feature.id === index
      );
      if (feature) {
        feature.feature.value = value;
        setDocumentFeatures(newDocumentFeatures);
      }
    };
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
            type="string"
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

        <button onClick={handleAddDocumentFeature}>Add feature</button>

        <div className="items-center">
          {documentFeatures.map((feature) => {
            const index = feature.id;
            return (
              <>
                <div key={index}>Document Feature</div>
                <input
                  type="text"
                  name="tag"
                  placeholder="Tag"
                  onChange={handleFeatureTagChange(index)}
                />
                <input
                  type="text"
                  name="length"
                  placeholder="Length"
                  onChange={handleFeatureLengthChange(index)}
                />
                <input
                  type="text"
                  name="value"
                  placeholder="Value"
                  onChange={handleFeatureValueChange(index)}
                />
                <button onClick={removeFeature(index)}>Remove Feature</button>
              </>
            );
          })}
        </div>

        <button className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none">
          Submit
        </button>
      </form>
    </>
  );
}
