import React from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const loadInstallation = () => {
  try {
    const data = localStorage.getItem('installation')
    return data ? JSON.parse(data) : []
  } catch (err) {
    console.log(err)
    return []
  }
}

// save
export const updateList = (app)=> {
  const installation = loadInstallation()

  try {
    const isDuplicate = installation. 
    some(p => p.id === app.id)
    if (isDuplicate) return 
    toast.success(
      `${app.companyName} : ${app.title} Uninstalled successfully!"`,
      {
        position: "top-right",
        theme: "dark",
      }
    );
    const updatedInstallation = [...  installation, 
     app]
    localStorage.setItem('installation', JSON.stringify(updatedInstallation))
  } catch (err) {
    console.log(err)
  }
}

// delete
export const removeFromUninstall = (id) => {
  const installation = loadInstallation()
  try {
    const updatedInstallation = installation.filter(p => p.id !== id)
    localStorage.setItem('installation', JSON.stringify(updatedInstallation))
  } catch (err) {
    console.log(err)
  }
}


  