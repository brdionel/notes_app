import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { createCategory, getAllCategories } from "../../services/categories";
import iziToast from "izitoast";

function useCategories() {
  const {
    isLoading: loadingCategory,
    isError: isErrorGettingCategories,
    data: categories,
  } = useQuery({
    queryKey: ["categoriesQuery"],
    queryFn: getAllCategories,
    refetchOnMount: false,
  });

  const queryClient = useQueryClient();

  const [categoryToCreate, setCategoryToCreate] = useState(null);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const inputRef = useRef();
  const buttonRef = useRef();
  const formRef = useRef();

  const handleCategoryToCreate = (e) => {
    setCategoryToCreate(e.target.value);
  };

  const { mutate, isLoading: isLoadingCreateCategory } = useMutation({
    mutationFn: createCategory,
    onSuccess: async (newCategory) => {
      console.log("SALE POR EL SUCCESS -> ", { newCategory });
      handleShowCategoryInput(false);
      setCategoryToCreate(null);
      if (newCategory.msg === "La categoria ya existe") {
        iziToast.error({
          title: "Error",
          message: "Error creating category! It already exists",
          position: "topRight",
        });
        return;
      }

      await queryClient.setQueryData(["categoriesQuery"], (oldData) => {
        console.log({ oldData, newCategory });
        if (oldData == null) return [newCategory];
        return [...oldData, newCategory];
      });
    },
    onError: (error) => {
      console.log({ error });
      setCategoryToCreate(null);
      iziToast.error({
        title: "Error",
        message: "Error creating category! Try again, please.",
        position: "topRight",
      });
    },
  });

  const createNewCategory = (e) => {
    e.preventDefault();
    if (!categoryToCreate || categoryToCreate.trim().length === 0) {
      iziToast.error({
        title: "Error",
        message: "Error creating category! Try again, please.",
        position: "topRight",
      });
      handleShowCategoryInput(false);
      setCategoryToCreate(null);
      return;
    }

    mutate({ name: categoryToCreate });
  };

  const handleShowCategoryInput = (value) => setShowCategoryInput(value);

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
    if (showCategoryInput) {
      inputRef.current.focus();
    }
  }, [showCategoryInput]);

  return {
    buttonRef,
    categories,
    categoryToCreate,
    createNewCategory,
    formRef,
    handleCategoryToCreate,
    handleShowCategoryInput,
    inputRef,
    isErrorGettingCategories,
    loadingCategory,
    isLoadingCreateCategory,
    showCategoryInput,
  };
}

export default useCategories;
