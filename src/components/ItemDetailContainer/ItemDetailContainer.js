

  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import ItemDetail from '../ItemDetail/ItemDetail';
  import { getDoc, doc } from 'firebase/firestore';
  import { db } from '../../services/FirebaseConfig';
  import './ItemDetailContainer.css'
  
  const ItemDetailContainer = () => {
      const [item, setItem] = useState(null);
      const [loading, setLoading] = useState(true);
  
      const { itemId } = useParams();
  
      useEffect(() => {
          setLoading(true);
          const docRef = doc(db, 'products', itemId); 
  
          getDoc(docRef)
              .then((response) => {
                  if (response.exists()) {
                      const data = response.data();
                      const productAdapted = { id: response.id, ...data };
                      setItem(productAdapted);
                  } else {
                      console.log('Document does not exist');
                  }
              })
              .catch((error) => {
                  console.log(error);
              })
              .finally(() => {
                  setLoading(false);
              });
      }, [itemId]);
  
      return (
          <>
              {loading ? (
                  <h3 className='Loading'>Cargando...</h3>
              ) : item ? (
                  <ItemDetail {...item} />
              ) : (
                  <p>Item no encontrado</p>
              )}
          </>
      );
  }
  
  export default ItemDetailContainer;
  