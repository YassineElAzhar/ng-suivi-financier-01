export interface ExpensesModel {
    id: number;
    userId: number;
    type: string;
    destinataire: string;
    titre: string;
    montant: number;
    dateExpense: string;
}