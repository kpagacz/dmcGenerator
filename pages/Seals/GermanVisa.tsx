export default function GermanVisa() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">German Visa form</h1>
      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
        <label htmlFor="magicConstant">Magic constant:</label>
        <input type="number" id="magicConstant" name="magicConstant" />
        <label htmlFor="version">Version:</label>
        <input type="number" id="version" name="version" />
        <label htmlFor="countryId">Country ID:</label>
        <input type="text" id="countryId" name="countryId" />
        <label htmlFor="signer">Signer:</label>
        <input type="text" id="signer" name="signer" />
        <label htmlFor="certificateReference">Certificate reference:</label>
        <input type="number" id="certificateReference" name="certificateReference" />
        <label htmlFor="documentIssueDate">Document issue date:</label>
        <input type="date" id="documentIssueDate" name="documentIssueDate" />

        </div>
      </form>
    </>
  )
}
