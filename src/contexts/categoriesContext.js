import { createContext, useEffect, useRef, useState } from "react";
import iziToast from "izitoast";
import { getAllCategories, createCategory } from "../services/categories";

const CategoriesContext = createContext();

export function CategoriesContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [categoryToCreate, setCategoryToCreate] = useState(null);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const inputRef = useRef();
  const buttonRef = useRef();
  const formRef = useRef();

  const getCategories = () => {
    getAllCategories()
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const handleCategoryToCreate = (e) => {
    setCategoryToCreate(e.target.value)
  }

  useEffect(() => {
    getCategories();
  }, []);

  const createNewCategory = (e) => {
    e.preventDefault();
    if(!categoryToCreate || categoryToCreate.trim().length === 0) {
      iziToast.error({
        title: "Error",
        message: "Error creating category! Try again, please.",
        position: "topRight",
      });
      handleShowCategoryInput(false);
      setCategoryToCreate(null);
      return;
    }

    setLoadingCategory(true);
    createCategory({name: categoryToCreate})
    .then(response => {
      console.log({response})
      setLoadingCategory(false);
      if(response.status == 200) {
        const categoryCreated = response.data;
        setCategories(prevState => [...prevState, categoryCreated]);
        iziToast.success({
          title: "OK",
          message: "Successfully created category!",
          position: "topRight",
        });
      }
      handleShowCategoryInput(false);
      setCategoryToCreate(null);
    })
    .catch((error) => {
      console.log({ error });
      setLoadingCategory(false);
      setCategoryToCreate(null)
      iziToast.error({
        title: "Error",
        message: "Error creating category! Try again, please.",
        position: "topRight",
      });
    });

  }

  const handleShowCategoryInput = (value) => setShowCategoryInput(value)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        formRef &&
        formRef.current &&
        !formRef.current.contains(event.target)
      ) {
        handleShowCategoryInput(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showCategoryInput]);

  useEffect(() => {
    if(showCategoryInput) {
      inputRef.current.focus();
    }
  }, [showCategoryInput])

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        getCategories,
        categoryToCreate,
        handleCategoryToCreate,
        createNewCategory,
        handleShowCategoryInput,
        showCategoryInput,
        inputRef,
        buttonRef,
        formRef,
        loadingCategory
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesContext;