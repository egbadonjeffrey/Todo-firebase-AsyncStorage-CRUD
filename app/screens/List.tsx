import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { MyContext } from "../../context/MyContext";
import * as ValidateUser from "../../helper/getUser";

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");
  const { username, setUsername } = useContext(MyContext);

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });

    return () => subscriber();
  }, []);

  useEffect(() => {
    const { checkUser } = ValidateUser;

    const handleCheckUser = async () => {
      try {
        const name = await checkUser();
        setUsername(name as string);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    handleCheckUser();

    return () => {
      handleCheckUser();
    };
  }, [username]);

  const addTodo = async () => {
    try {
      await addDoc(collection(FIRESTORE_DB, "todos"), {
        title: todo,
        done: false,
      });
      setTodo("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/` + item.id);

    const toggleDone = async () => {
      await updateDoc(ref, {
        done: !item.done,
      });
    };

    const deleteItem = async (id: any) => {
      await deleteDoc(ref);
      console.log("deleted");
    };
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone}>
          <Text style={[styles.todoText, item.done && styles.done]}>
            {item.title.length > 30
              ? item.title.slice(0, 30) + "..."
              : item.title}
          </Text>
        </TouchableOpacity>
        <View style={styles.iconLink}>
          <MaterialIcons
            name="delete"
            onPress={() => deleteItem(item.id)}
            size={20}
            color="crimson"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { item })}
          >
            <Text style={styles.link}>See more</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Add new todo"
            onChangeText={(text: string) => setTodo(text)}
            value={todo}
          />
          <Button onPress={addTodo} title="Add Todo" disabled={todo === ""} />
        </View>
        <Text style={styles.welcome}>
          {username && username !== "" ? `Hello ${username},` : ""}
        </Text>

        {todos.length > 0 && (
          <FlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={(todo) => todo.id}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default List;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    backgroundColor: "#fff",
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  todoList: {
    marginVertical: 20,
  },
  todoContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 5,
  },
  todoText: {
    fontSize: 20,
  },
  done: {
    textDecorationLine: "line-through",
    color: "red",
  },
  iconLink: {
    flex: 1,
    gap: 20,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  link: {
    color: "blue",
    fontSize: 15,
  },
  welcome: {
    fontSize: 20,
    marginVertical: 5,
  },
});
