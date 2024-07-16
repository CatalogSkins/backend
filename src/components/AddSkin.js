import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddSkinSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
  imageUrl: Yup.string().url('Invalid URL').required('Required'),
});

const AddSkin = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Add New Skin</h1>
      <Formik
        initialValues={{
          name: '',
          description: '',
          price: '',
          imageUrl: '',
        }}
        validationSchema={AddSkinSchema}
        onSubmit={(values, { setSubmitting }) => {
          axios.post('http://localhost:5000/skins', values)
            .then(() => {
              setSubmitting(false);
              navigate('/');
            })
            .catch(error => {
              console.error('Error adding skin:', error);
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
              Add Skin
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSkin;