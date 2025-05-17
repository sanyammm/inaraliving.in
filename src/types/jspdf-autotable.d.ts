import 'jspdf';
// import { UserOptions } from 'jspdf-autotable';

// declare module 'jspdf' {
//   interface jsPDF {
//     autoTable: (options: UserOptions) => jsPDF;
//   }
// }

// Extend jsPDF to include lastAutoTable
declare module "jspdf" {
    interface jsPDF {
      lastAutoTable: {
        finalY: number;
      };
    }
  }
  