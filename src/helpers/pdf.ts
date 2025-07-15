import type { IOrder } from "../types/order";
import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
import "pdfmake/build/vfs_fonts";

export const generatePdf = (orders: IOrder[]) => {
  const body = [
    [
      { text: "Номер замовлення", style: "tableHeader" },
      { text: "Клієнт", style: "tableHeader" },
      { text: "Дата", style: "tableHeader" },
      { text: "Статус", style: "tableHeader" },
      { text: "Сума", style: "tableHeader" },
    ],
    ...orders.map((order) => [
      order.id,
      order.client,
      new Date(order.date as string).toLocaleDateString(),
      order.status,
      Number(order.amount).toFixed(2),
    ]),
  ];

  const docDefinition = {
    content: [
      { text: "Список замовлень", style: "header" },
      {
        table: {
          widths: ["auto", "*", "auto", "*", "auto"],
          body: body,
        },
        layout: "lightHorizontalLines",
      },
    ],
    defaultStyle: {
      font: "Roboto",
    },
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableHeader: {
        bold: true,
        fillColor: "#eeeeee",
        margin: [0, 5, 0, 5],
      },
    },
  };

  pdfMake.createPdf(docDefinition as never).download("orders.pdf");
};
