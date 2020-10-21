import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useStore(props) {
  const stores = useSelector((state) => state.store.stores);
  return stores;
}
