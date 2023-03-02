export default interface Visa {
  magicConstant: number;
  version: number;
  countryId: string;
  signer: string;
  certificateReference: number;
  documentIssueDate: Date;
  signatureCreationDate: Date;
  documentFeatureDefinitionReference: number;
  documentTypeCategory: number;
}
