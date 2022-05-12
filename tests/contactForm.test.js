import { mount, flushPromises } from '@vue/test-utils';
import { expect, test } from 'vitest';

import ContactForm from '../src/components/ContactForm.vue';

const getName = (wrapper) => {
  return wrapper.find('input[name="name"]');
};

const getEmail = (wrapper) => {
  return wrapper.find('input[name="email"]');
};

const getSubject = (wrapper) => {
  return wrapper.find('input[name="subject"]');
};

const getMessage = (wrapper) => {
  return wrapper.find('textarea[name="message"]');
};

const getSubmit = (wrapper) => {
  return wrapper.find('form');
};

test('Mounted component is truthy', async () => {
  expect(ContactForm).toBeTruthy();
});

test('Given invalid data form is not submitted ', async () => {
  const wrapper = mount(ContactForm);

  getName(wrapper).setValue('🛠️');
  getEmail(wrapper).setValue('hello');
  getMessage(wrapper).setValue('🛠️'.repeat(510));

  await getSubmit(wrapper).trigger('submit.prevent');
  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(wrapper.text().includes('Must be at least 5 characters'));
  expect(wrapper.text().includes('Invalid email'));
  expect(wrapper.text().includes('Must be smaller than 500 characters'));

  expect(wrapper.emitted()).not.toHaveProperty('onSubmit');
});

test('Given valid data requests is successful ', async () => {
  const wrapper = mount(ContactForm);

  getName(wrapper).setValue('Jakub');
  getEmail(wrapper).setValue('jakub@bednarski.dev');
  getMessage(wrapper).setValue('Hello World!');

  await getSubmit(wrapper).trigger('submit.prevent');
  await new Promise((resolve) => setTimeout(resolve, 10));

  await flushPromises();

  expect(wrapper.emitted()).toHaveProperty('onSubmit');
});

test('Given success status show info ', async () => {
  const wrapper = mount(ContactForm, {
    propsData: {
      status: 200,
    },
  });

  expect(wrapper.text()).toContain('Success! Thanks for contacting us...');
});

test('Given error status show info ', async () => {
  const wrapper = mount(ContactForm, {
    propsData: {
      status: 400,
    },
  });

  expect(wrapper.text()).toContain(' Something went wrong! Try again later...');
});
