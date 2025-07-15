import Button from "@mui/material/Button";
import Container from "../components/Container/Container";
import DataTable from "../components/DataTable/DataTable";
import BasicModal from "../components/mui/ModalBase";
import OrderForm from "../components/OrderForm/OrderForm";
import { useState } from "react";
import { generatePdf } from "../helpers/pdf";
import { useSelector } from "react-redux";
import { selectOrders } from "../store/orders/selectors";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const orders = useSelector(selectOrders);
  return (
    <section className="home-page">
      <Container>
        <div className="wrapper-btn">
          <Button onClick={() => setIsOpen(true)} variant="contained">
            Нове замовлення
          </Button>
          <Button onClick={() => generatePdf(orders)} variant="contained">
            Експорт
          </Button>
        </div>

        <div className="wrapper-table">
          <DataTable />
        </div>

        <BasicModal
          title="Створення замовлення"
          onClose={handleClose}
          open={isOpen}
        >
          <OrderForm onSubmit={handleClose} onClose={handleClose} />
        </BasicModal>
      </Container>
    </section>
  );
};

export default HomePage;
