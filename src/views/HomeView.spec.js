import { describe, it, expect } from 'vitest'
import mockData from '../../mockData.json'

console.log('CONSOLE', mockData)

import { mount } from '@vue/test-utils'
import HomeView from './HomeView.vue'

describe('HomeView', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain('Popular Movies')
  })
})
