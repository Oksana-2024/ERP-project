import { useSelector } from "react-redux";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectOrders } from "../../store/orders/selectors";
import type { IOrder } from "../../types/order";
import { useAppDispatch } from "../../hooks/useDispatch";
import { deleteOrder, setCurrentOrder } from "../../store/orders/slice";
import Button from "@mui/material/Button";
import OrderForm from "../OrderForm/OrderForm";
import BasicModal from "../mui/ModalBase";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import Box from "@mui/material/Box";

const DataTable = () => {
  const columns: ColumnDef<IOrder, string>[] = [
    {
      accessorKey: "id",
      header: "Номер замовлення",
      cell: (props) => <p>{props.getValue()}</p>,
      enableSorting: true,
    },
    {
      accessorKey: "client",
      header: "Клієнт",
      cell: (props) => <p>{props.getValue()}</p>,
      enableSorting: true,
    },
    {
      accessorKey: "date",
      header: "Дата",
      cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: "Статус",
      cell: (props) => {
        const value = props.getValue();
        let className = "";
        switch (value) {
          case "Відвантажено":
            className = "status-new";
            break;
          case "Очікує оплати":
            className = "status-pending";
            break;

          default:
            className = "status-done";
            break;
        }
        return <span className={className}>{value}</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "amount",
      header: "Сума",
      cell: (props) => <p>{Number(props.getValue()).toFixed(2)} ₴</p>,
      enableSorting: true,
    },
    {
      accessorKey: "id",
      header: "",
      id: "edit",
      size: 40,
      enableSorting: false,
      cell: (props) => {
        return (
          <Button
            onClick={() => {
              dispatch(setCurrentOrder(props.row.original));
              setIsOpen(true);
            }}
          >
            <EditIcon />
          </Button>
        );
      },
    },
    {
      accessorKey: "id",
      header: "",
      id: "delete",
      size: 40,
      enableSorting: false,
      cell: (props) => {
        return (
          <Button
            onClick={() => dispatch(deleteOrder(Number(props.getValue())))}
          >
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  const data = useSelector(selectOrders);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Box className="table">
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box
                className="th"
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                style={{ width: header.getSize() }}
              >
                <Box
                  sx={{
                    height: "40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <KeyboardArrowDownIcon />,
                    desc: <KeyboardArrowUpIcon />,
                  }[header.column.getIsSorted() as string] ?? null}
                </Box>
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <div
                className="td"
                key={cell.id}
                style={
                  cell.column.id === "edit" || cell.column.id === "delete"
                    ? {
                        textAlign: "center",
                        verticalAlign: "middle",
                        padding: 0,
                      }
                    : undefined
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </Box>
        ))}
      </Box>
      <BasicModal
        title="Редагування замовлення"
        onClose={handleClose}
        open={isOpen}
      >
        <OrderForm onClose={handleClose} onSubmit={handleClose} />
      </BasicModal>
    </>
  );
};

export default DataTable;
