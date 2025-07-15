import Button from "@mui/material/Button";
import Container from "../components/Container/Container";
import DataTable from "../components/DataTable/DataTable";
import BasicModal from "../components/mui/ModalBase";
import OrderForm from "../components/OrderForm/OrderForm";
import { useState } from "react";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <section className="home-page">
      <Container>
        <Button
          onClick={() => setIsOpen(true)}
          variant="contained"
        >
          Нове замовлення
        </Button>

        <DataTable />

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
