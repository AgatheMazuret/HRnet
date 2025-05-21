// Définition du type Employee représentant un employé dans l'application
// Chaque propriété correspond à un champ du formulaire ou une donnée de l'employé
// Ce type est utilisé pour typer les données des employés dans l'application React

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  startDate: string;
  department: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export type { Employee };
