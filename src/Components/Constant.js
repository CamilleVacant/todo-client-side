export const filtersList = ["Date", "Type", "Statut"];
export const options = {
  Date: [
    { label: "Date", value: undefined },
    { label: "Croissant", value: "DATE_ASC" },
    { label: "Décroissant", value: "DATE_DESC" },
  ],
  Type: [
    { label: "Type", value: undefined },
    { label: "Marketing", value: "Marketing" },
    { label: "RH", value: "RH" },
    { label: "Communication", value: "Communication" },
    { label: "Tech", value: "Tech" },
  ],
  Statut: [
    { label: "Statut", value: undefined },
    { label: "Fait", value: true },
    { label: "A faire", value: false },
  ],
};