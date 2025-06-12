import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useBooks } from "../../../../hooks/useBooks";

import Spacer from "../../../../components/Spacer";
import ThemedView from "../../../../components/ThemedView";
import ThemedText from "../../../../components/ThemedText";
import ThemedTextInput from "../../../../components/ThemedTextInput";
import ThemedCard from "../../../../components/ThemedCard";
import ThemedLoader from "../../../../components/ThemedLoader";
import ThemedButton from "../../../../components/ThemedButton";
import { Colors } from "../../../../constants/Colors";
import { Keyboard } from "react-native";

const UpdateBook = () => {
  const [book, setBook] = useState(null);
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const { fetchBookById, updateBook } = useBooks();

  useEffect(() => {
    async function loadBook() {
      const bookData = await fetchBookById(id);
      setBook(bookData);
    }

    loadBook();
  }, [id]);

  const handleUpdate = async () => {
    await updateBook(id, {
      title: book.title,
      author: book.author,
      description: book.description,
    });
    router.replace("/books");
  };

  if (!book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe={true} style={styles.container}>
        <ThemedCard style={styles.card}>
          <ThemedText title={true} style={styles.title}>
            Update Book
          </ThemedText>
          <Spacer />

          <ThemedTextInput
            style={styles.input}
            placeholder="Title"
            value={book.title}
            onChangeText={(newTitle) => setBook({ ...book, title: newTitle })}
          />
          <Spacer height={10} />

          <ThemedTextInput
            style={styles.input}
            placeholder="Author"
            value={book.author}
            onChangeText={(newAuthor) =>
              setBook({ ...book, author: newAuthor })
            }
          />
          <Spacer height={10} />

          <ThemedTextInput
            style={styles.input}
            placeholder="Description"
            value={book.description}
            onChangeText={(newDescription) =>
              setBook({ ...book, description: newDescription })
            }
          />
          <Spacer height={30} />

          <ThemedButton style={styles.update} onPress={handleUpdate}>
            <Text style={{ color: "#FFF", textAlign: "center" }}>Save</Text>
          </ThemedButton>
        </ThemedCard>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default UpdateBook;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  card: {
    margin: 20,
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  update: {
    backgroundColor: Colors.primary,
    width: 200,
    alignSelf: "center",
  },
});
