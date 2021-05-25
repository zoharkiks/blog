import { ActionTypes } from "../actions/types";
import axios from "axios";


export const seletcedArticleStart =()=>{
  return{
    type:ActionTypes.SELECTED_ARTICLE_START
  }
}

export const selectedArticle =(article)=>{
    return{
      type:ActionTypes.SELECTED_ARTICLE,
      payload:article
    }
  }

export const removeSelectedArticle = ()=>{
  return{
    type: ActionTypes.REMOVE_SELECTED_ARTICLE
  }
}

  export const fetchArticle = (id)=>{
      return(dispatch)=>{
        dispatch(seletcedArticleStart())
        axios
        .get(`http://localhost:1337/articles/${id}`)
        .then((res) => {
          const data = res.data;
          dispatch(selectedArticle(data));
        })
        .catch((error) => {
          const errMsg = error.message;
          
        });
      }
  }