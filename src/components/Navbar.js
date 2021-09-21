import React, { useEffect, useState, useRef } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import cdcGrey from '../images/cdc-grey.png'
import cdcWhite from '../images/cdc-white.png'
import { List, CaretDown } from 'phosphor-react'
import Sidebar from './Sidebar'

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  let hoverTimer = null

  const data = useStaticQuery(graphql`
    query menuQuery {
      menu: wpMenu(slug: { eq: "menu" }) {
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
      langMenu: wpMenu(slug: { eq: "lang-menu" }) {
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

  let items = data.menu?.menuItems?.nodes.filter(item => !item.parentId)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = e => {
    if (window.scrollY === 0) {
      setScrolling(false)
    } else {
      setScrolling(true)
    }
  }

  const handleHoverChange = change => {
    clearTimeout(hoverTimer)
    if (change === false) {
      hoverTimer = setTimeout(() => setIsHovering(change), 200)
    } else {
      setIsHovering(change)
    }
  }

  let textColor = scrolling || isHovering ? 'text-gray-500' : 'text-white'

  return (
    <header className="w-full fixed">
      <nav
        className={`transition-colors duration-500 ease-in-out w-full h-20 px-4 relative ${
          scrolling || isHovering ? 'bg-white' : 'bg-navbar'
        }`}
      >
        <div className="flex w-full justify-evenly h-full items-center md:flex">
          <List
            className={`text-2xl text-white mr-8 ${textColor} cursor-pointer`}
            onClick={() => setIsOpen(true)}
          />
          <div className="h-full items-center mr-auto flex sm:flex space-x-2 nav-items">
            {items.map(item => (
              <MenuItem
                item={item}
                textColor={textColor}
                setIsHovering={setIsHovering}
                handleHoverChange={handleHoverChange}
              />
            ))}
          </div>
          <div className="flex-1 w-full flex justify-center items-center absolute">
            <Link
              className="flex-1 flex justify-center items-center absolute"
              to="/"
              style={{ width: '200px' }}
            >
              <img
                src={scrolling || isHovering ? cdcGrey : cdcWhite}
                className="w-52 transition-all"
              />
            </Link>
          </div>

          <div className="flex justify-end flex-1 ml-auto items-center space-x-6">
            <a title="EN" className={`${textColor} cursor-pointer`}>
              |<span> EN </span>|
            </a>
            {data.langMenu.menuItems.nodes.map(item => (
              <Link to={item.url} key={item.url} className={textColor}>
                {item.label}
              </Link>
            ))}
            <button className="transition duration-500 ease-in-out bg-light-blue text-white uppercase px-6 h-9 hover:text-brand-gray">
              Book
            </button>
          </div>
        </div>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
    </header>
  )
}

const MenuItem = ({ item, setIsHovering, textColor, handleHoverChange }) => {
  const titleRef = useRef()
  const menuRef = useRef()
  let hoverTimeout = null

  let targetPos = titleRef.current?.getBoundingClientRect()

  let leftPadding =
    targetPos?.left +
    (titleRef?.current?.offsetWidth - menuRef.current?.offsetWidth) +
    'px'

  return (
    <div
      className="group h-full flex-col justify-center items-center flex"
      onMouseEnter={() =>
        item.childItems?.nodes.length && handleHoverChange(true)
      }
      onMouseLeave={() =>
        item.childItems?.nodes.length && handleHoverChange(false)
      }
    >
      <span
        className={`${textColor} uppercase text-sm hover:underline`}
        to={item.url}
        key={item.url}
        ref={titleRef}
      >
        {item.label}
      </span>
      {item.childItems?.nodes.length ? (
        <div
          style={{
            paddingLeft: leftPadding,
          }}
          className="flex transition duration-500 ease-in-out invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-16 bg-white w-full left-0"
        >
          <div className="flex flex-col items-center" ref={menuRef}>
            <CaretDown />
            {item.childItems?.nodes.map(childItem => (
              <Link
                className="text-xs hover:underline uppercase navbar-item hover:font-bold block whitespace-pre px-4 py-2 cursor-pointer"
                key={childItem.id}
                to={childItem.url}
              >
                {childItem.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Navbar
