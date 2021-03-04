import { ExceptionMap } from 'antd/lib/result'
import React from 'react'
import {render,unmountComponentAtNode} from 'react-dom'
import {act} from 'react-dom/test-utils'

import Item from './Item'

let container = null
beforeEach(()=>{
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(()=>{
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

it('每条待处理事项',()=>{
    act(()=>{
        render(<Item id='1' text='明天中午吃牛排' index=0  time='2021-3-10'/>,container);
    })
    expect(container.textContent).toBe('明天中午吃牛排')
    act(()=>{
        render(<Item id='1' text='明天中午吃泡面' index=1  time='2021-3-11'/>,container);
    })
    expect(container.textContent).toBe('明天中午吃泡面')
    act(()=>{
        render(<Item id='1' text='明天中午吃土' index=2 time='2021-3-12'/>,container);
    })
    expect(container.textContent).toBe('明天中午吃土')
})