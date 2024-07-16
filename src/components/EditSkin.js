import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const EditSkinSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
  imageUrl: Yup.string().url('Invalid URL').required('Required'),
});

const EditSkin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skin, setSkin] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/skins/${id}`)
      .then(response => setSkin(response.data))
      .catch(error => console.error('Error fetching skin:', error));
  }, [id]);

  if (!skin) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Skin</h1>
      <Formik
        initialValues={skin}
        validationSchema={EditSkinSchema}
        onSubmit={(values, { setSubmitting }) => {
          axios.put(`http://localhost:5000/skins/${id}`, values)
            .then(() => {
              setSubmitting(false);
              navigate('/');
            })
            .catch(error => {
              console.error('Error editing skin:', error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field name="description" />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <Field name="price" type="number" />
            </div>
            <div>
              <label htmlFor="imageUrl">Image URL</label>
              <Field name="imageUrl" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditSkin;