
import {
    Avatar,
    Button,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
  } from "flowbite-react";
  import React from "react";
  
  
  function Component({info}) {



    const signout = async () => {
      try {
        const response = await fetch('/logout'); // Assuming your backend endpoint is '/api/profile'
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            window.location.href = '/';
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } 
    };

    



    return (
      <Navbar fluid rounded>
        <NavbarBrand href="https://flowbite-react.com">
          <img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Music App</span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{info.username}</span>
              <span className="block truncate text-sm font-medium">{info.email}</span>
            </DropdownHeader>
            <DropdownItem><a href="/profile">Dashboard</a></DropdownItem>
            <DropdownDivider />
            <DropdownItem><Button className=" bg-black" onClick={signout}>Sign out</Button></DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
       
      </Navbar>
    );
  }
export default Component;  