import BeforeAfter from '@/components/BeforeAfter'
import { shallowMount } from '@vue/test-utils'

const props = {
  afterImage: 'img.jpg',
  beforeImage: 'img.jpg',
  value: 50,
  step: 0.1,
}

const spy = jest.fn()
const testWidth = 420
const inputValue = 89

describe('BeforeAfter component', () => {
  let wrapper

  beforeAll(() => {
    window.addEventListener('resize', spy)
  })

  beforeEach(() => {
    wrapper = shallowMount(BeforeAfter, {
      propsData: props,
    })
  })

  afterEach(() => {
    wrapper = null
  })

  it('should render correctly with images', () => {
    expect(wrapper.props()).toEqual(props)
    expect(wrapper.is(BeforeAfter)).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('the compareWidth should correctly react to change value of the input', () => {
    const rangeInput = wrapper.find('.compare__range')
    rangeInput.setValue(inputValue)
    rangeInput.trigger('input change')

    setTimeout(() => {
      expect(wrapper.find('.img-wrapper__compare-overlay').attributes().style).toBe(`width: ${inputValue}%;`)
    }, 0)
    expect(wrapper.vm.compareWidth).toBe(`${inputValue}`)
  })

  it('does not fire resize event by default', () => {
    expect(spy).not.toHaveBeenCalled()
    expect(window.innerWidth).not.toBe(testWidth)
  })

  it('updates the window width', () => {
    window.innerWidth = testWidth
    window.dispatchEvent(new Event('resize'))

    expect(spy).toHaveBeenCalledTimes(1)
    expect(window.innerWidth).toBe(testWidth)
  })

  it('should correctly remove resize event listener from window', () => {
    wrapper = shallowMount(BeforeAfter, {
      propsData: props,
      attachTo: document.body,
    })
    wrapper.destroy()

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
