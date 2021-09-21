import React, { useEffect, useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import cdcGrey from '../images/cdc-grey.png'
import cdcWhite from '../images/cdc-white.png'
import { List, CaretRight, X } from 'phosphor-react'

const Navbar = ({ isOpen, setIsOpen }) => {
  const data = useStaticQuery(graphql`
    query sidebarQuery {
      wpMenu(slug: { eq: "main-menu" }) {
        slug
        menuItems {
          nodes {
            url
            label
            parentId
            childItems {
              nodes {
                url
                label
              }
            }
          }
        }
      }
    }
  `)

  let items = data.wpMenu?.menuItems?.nodes.filter(item => !item.parentId)
  return (
    <>
      {isOpen && (
        <div
          className="z-10 fixed inset-0 transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-white opacity-50" />
        </div>
      )}
      <aside
        className={`transform top-0 left-0 w-72 bg-white fixed h-full ease-in-out transition-all duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <span
          className="fixed inset-8 cursor-pointer w-16 h-8 text-xs flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <X />
          Close
        </span>
        <ul className="pt-20 px-8 pb-28">
          {items.map(item => (
            <MenuItem item={item} />
          ))}
        </ul>
      </aside>
    </>
  )
}

const MenuItem = ({ item }) => {
  return (
    <li className="group flex w-full justify-between items-center hover:text-hover-gray  ease-in-out transition-all duration-300">
      <Link className=" uppercase py-2 text-sm hover:underline cursor-pointer">
        {item.label}
      </Link>
      {item.childItems?.nodes.length > 0 && (
        <>
          <CaretRight />
          <ul
            className="bg-white transition-all duration-300  ease-linear z-30 opacity-0 invisible group-hover:visible group-hover:opacity-100 fixed top-0 h-screen pt-20 px-8 pb-28 w-72"
            style={{ left: '18rem' }}
          >
            {item.childItems.nodes.map(childItem => (
              <li className="hover:text-black text-black">
                <Link
                  to={childItem.url}
                  className="uppercase py-2 text-sm hover:underline cursor-pointer"
                >
                  {childItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  )
}

export default Navbar
