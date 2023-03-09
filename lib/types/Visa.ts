export default interface Visa {
  magicConstant: number;
  version: number;
  countryId: string;
  signer: string;
  certificateReference: string;
  documentIssueDate: Date;
  signatureCreationDate: Date;
  documentFeatureDefinitionReference: number;
  documentTypeCategory: number;
}
