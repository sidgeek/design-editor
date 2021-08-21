import { HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'

class ScrollHandler extends BaseHandler {
  scrollY: HTMLDivElement
  constructor(props: HandlerOptions) {
    super(props)
    this.scrollY = document.getElementById('scrollY') as HTMLDivElement
    this.init()
  }

  init = () => {
    // @ts-ignore
    const { height } = this.canvas.wrapperEl.getBoundingClientRect()
    this.scrollY.style.height = `${800}px`
    this.scrollY.style.top = `${height / 2 - 400}px`
  }

  move = (value: number) => {
    const change = value < 0 ? 30 : -30
    const { top } = this.scrollY.getBoundingClientRect()
    this.scrollY.style.transition = 'all 0.1s'
    this.scrollY.style.top = `${top + change}px`
  }
}

export default ScrollHandler
