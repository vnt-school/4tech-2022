import { Button, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCategories } from "../services/api";
import { IExpenses } from "./FinancesTable";

interface Props {
    isOpen: boolean;
    onSave: (expense: IExpenses) => void;
    onClose: () => void;
}

function NewExpenseModal({ isOpen, onSave, onClose }: Props) {
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(1);
    const [category, setCategory] = useState<string>();

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        getCategories()
            .then((categories) => setCategories(categories.map(category => category.name)));
    }, []);

    const handleAddExpense = () => {
        const expense = {
            description: description,
            value,
            category,
        };
        console.log({ expense });

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Despesa</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Grid
                        templateColumns={"repeat(2, 1fr)"}
                        templateRows={"repeat(2, 1fr)"}
                        gap={4}
                    >
                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel>Descrição</FormLabel>
                                <Input
                                    placeholder="Descrição"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel htmlFor="value">Valor</FormLabel>
                                <NumberInput min={1} onChange={(_, value) => setValue(value)}>
                                    <NumberInputField id="value" />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel htmlFor="category">Categoria</FormLabel>
                                <Select
                                    id="category"
                                    placeholder="Categoria"
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </GridItem>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => onClose()} mr={3}>
                        Cancelar
                    </Button>
                    <Button
                        colorScheme="green"
                        onClick={handleAddExpense}
                    >
                        Adicionar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default NewExpenseModal;