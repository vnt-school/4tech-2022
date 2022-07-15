import { Button, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IExpenses } from "../models/IExpense";
import { getCategories, saveExpense } from "../services/api";

interface Props {
    isOpen: boolean;
    expense?: IExpenses;
    onSave: () => void;
    onClose: () => void;
}

function NewExpenseModal({ isOpen, expense, onSave, onClose }: Props) {
    const toast = useToast();
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(1);
    const [category, setCategory] = useState<string>();

    const [isLoading, setLoading] = useState(false);

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        setDescription(expense?.description ?? "");
        setValue(expense?.value ?? 1);
        setCategory(expense?.category);
    }, [expense]);

    useEffect(() => {
        getCategories()
            .then((categories) => setCategories(categories.map(category => category.name)));
    }, []);

    const handleAddExpense = async () => {
        if (!category) {
            return;
        }

        const expenseToSave = {
            id: expense?.id,
            description: description,
            value,
            category,
            date: expense?.date ?? Date.now(),
        };

        setLoading(true);

        await saveExpense(expenseToSave);

        setLoading(false);

        toast({
            title: "Despesa salva",
            description: "Despesa foi salva com sucesso",
            status: "success",
            position: "top-right",
        });

        onSave();
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
                                <NumberInput step={0.01} min={0.01} value={value} onChange={(_, value) => setValue(value)}>
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
                                    value={category}
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
                        disabled={isLoading}
                    >
                        {expense ? "Editar" : "Adicionar"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default NewExpenseModal;