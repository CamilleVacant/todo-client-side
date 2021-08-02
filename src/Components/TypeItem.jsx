import React from 'react'
import { css } from '@emotion/css'

const TypeItem = ({type}) => {

    return (
        <div
            className={css`
              padding: 0px 8px 0px 8px;
              margin: 8px;
              background-color: #DBDBF5;
              display: flex;
              align-self: center;
              font-size: 12px;
            `}
        >
            <p>{type}</p>
        </div>
    )
}

export default TypeItem
