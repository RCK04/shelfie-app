import { StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useBooks } from "../../../hooks/useBooks";

import Spacer from "../../../components/Spacer";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedCard from "../../../components/ThemedCard";
import ThemedLoader from "../../../components/ThemedLoader";
import ThemedButton from "../../../components/ThemedButton"
import { Colors } from "../../../constants/Colors";


const BookDetails = () => {
    const [book, setBook] = useState(null);
    const router = useRouter();

    const { id } = useLocalSearchParams();
    const { fetchBookById, deleteBook, updateBook } = useBooks();

    const handleDelete = async () => {
        await deleteBook(id);
        setBook(null);
        router.replace("/books");
    }

    useEffect(() => {
        async function loadBook() {
            const bookData = await fetchBookById(id);
            setBook(bookData);
        }

        loadBook();
    }, [id])

    if (!book) {
        return (
            <ThemedView safe={true} style={styles.container}>
                <ThemedLoader />
            </ThemedView>
        )
    }

    return (
        <ThemedView safe={true} style={styles.container}>
            <ThemedCard style={styles.card}>
                <ThemedText style={styles.title}>{book.title}</ThemedText>
                <ThemedText>Written by {book.author}</ThemedText>
                <Spacer />

                <ThemedText title={true}>Book description:</ThemedText>
                <Spacer height={10} />

                <ThemedText>{book.description}</ThemedText>

                <ThemedCard style={styles.buttonsContainer}>
                    <ThemedButton style={styles.delete} onPress={handleDelete}>
                        <Text style={{ color: '#FFF', textAlign: 'center'}}>
                            Delete Book
                        </Text>
                    </ThemedButton>

                    <ThemedButton style={styles.update} onPress={() => router.push(`/books/${id}/update`)}>
                        <Text style={{ color: '#FFF', textAlign: 'center'}}>
                            Update Book
                        </Text>
                    </ThemedButton>
                </ThemedCard>
            </ThemedCard>
        </ThemedView>
    )
}

export default BookDetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    card: {
        margin: 20,
    },
    title: {
        fontSize: 22,
        marginVertical: 10,
    },
    delete: {
        backgroundColor: Colors.warning,
        width: 150,
    },
    update: {
        backgroundColor: Colors.primary,
        width: 150,
    },
    buttonsContainer: {
        alignSelf: 'center',
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        gap: 20,
    }
})