import chai from 'chai';
import {HtmlView, View} from "../src/View.js";

const expect = chai.expect;

describe('The View base class', () => {
    it('has stub methods for draw and showPaused', () => {
        const view = new View();
        expect(view.draw).to.be.a('function');
        expect(view.showPaused).to.be.a('function');
    });

    it('returns dumb defaults for getBounds', () => {
        const view = new View();
        expect(view.getBounds()).to.deep.equal({
            height: 10,
            width: 10
        });
    });
});

describe('The HTML class', () => {
    function getCanvasContextSpy() {
        return {
            clearRectCalled: 0,
            clearRect: function () {
                console.log('CLEAR CALLED')
                this.clearRectCalled++;
            }
        }
    }

    function getCanvasElementSpy() {
        return {
            width: 1,
            height: 1,
            clientWidth: 300,
            clientHeight: 150,
            getContext: getCanvasContextSpy
        }
    }

    function getWindowSpy() {
        return {
            addEventListenerCalled: 0,
            addedType: '',
            addEventListener: function (type) {
                this.addEventListenerCalled++;
                this.addedType = type;
            }
        };
    }

    const mockState = {
        entities: []
    };

    it('adds a resize event listener to the window', () => {
        const windowSpy = getWindowSpy();
        const view = HtmlView(windowSpy, getCanvasElementSpy());

        expect(windowSpy.addEventListenerCalled).to.equal(1);
        expect(windowSpy.addedType).to.equal('resize');
    });

    it('sizes the canvas element on resize', () => {
        const canvasSpy = getCanvasElementSpy();
        const view = HtmlView(getWindowSpy(), canvasSpy);

        view.resize();
        expect(canvasSpy.width).to.equal(canvasSpy.clientWidth);
        expect(canvasSpy.height).to.equal(canvasSpy.clientHeight);
    });

    it.skip('clears the canvas on redraw', () => {
        const canvasSpy = getCanvasElementSpy();
        const contextSpy = canvasSpy.getContext();

        const view = HtmlView(getWindowSpy(), canvasSpy);

        view.draw(mockState, 1);

        expect(contextSpy.clearRectCalled).to.equal(1);
    });
});