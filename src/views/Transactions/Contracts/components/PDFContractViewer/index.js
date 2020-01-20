import React from 'react'
import PropTypes from 'prop-types'

import PDF from './components/RenderPdf'
import Navigation from './components/NavigationBar'
import Loader from './components/Loader'

class PDFViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: this.props.page,
            pages: 0,
            scale: this.props.scale,
            defaultScale: this.props.scale,
            rotationAngle: this.props.rotationAngle,
            isReady: false,
        }
        this.getPageCount = this.getPageCount.bind(this)
        this.handlePrevClick = this.handlePrevClick.bind(this)
        this.handleNextClick = this.handleNextClick.bind(this)
        this.handleZoomIn = this.handleZoomIn.bind(this)
        this.handleResetZoom = this.handleResetZoom.bind(this)
        this.handleZoomOut = this.handleZoomOut.bind(this)
        this.handleRotateLeft = this.handleRotateLeft.bind(this)
        this.handleResetRotation = this.handleResetRotation.bind(this)
        this.handleRotateRight = this.handleRotateRight.bind(this)
    }

    getPageCount(pages) {
        if (this.state.pages !== pages) {
            this.setState({ pages, isReady: true })
        }
    }

    handlePrevClick() {
        if (this.state.page === 1) return

        this.setState({
            page: this.state.page - 1,
        })

        if (this.props.onPrevBtnClick) {
            this.props.onPrevBtnClick(this.state.page - 1)
        }
    }

    handleNextClick() {
        if (this.state.page === this.pages) return

        this.setState({
            page: this.state.page + 1,
        })

        if (this.props.onNextBtnClick) {
            this.props.onNextBtnClick(this.state.page + 1)
        }
    }

    handleZoomIn() {
        if (this.state.scale < this.props.maxScale) {
            this.setState({
                scale: this.state.scale + this.props.scaleStep,
            })
        }

        if (this.props.onZoom) {
            this.props.onZoom(this.state.scale + this.props.scaleStep)
        }
    }

    handleResetZoom() {
        this.setState({
            scale: this.state.defaultScale,
        })

        if (this.props.onZoom) {
            this.props.onZoom(this.state.defaultScale)
        }
    }

    handleZoomOut() {
        if (this.state.scale > this.props.minScale) {
            this.setState({
                scale: this.state.scale - this.props.scaleStep,
            })
        }

        if (this.props.onZoom) {
            this.props.onZoom(this.state.scale - this.props.scaleStep)
        }
    }

    handleRotateLeft() {
        if (this.state.rotationAngle !== -90) {
            this.setState({
                rotationAngle: -90,
            })
        }

        if (this.props.onRotation) {
            this.props.onRotation(-90)
        }
    }

    handleResetRotation() {
        if (this.state.rotationAngle !== 0) {
            this.setState({
                rotationAngle: 0,
            })
        }

        if (this.props.onRotation) {
            this.props.onRotation(0)
        }
    }

    handleRotateRight() {
        if (this.state.rotationAngle !== 90) {
            this.setState({
                rotationAngle: 90,
            })
        }

        if (this.props.onRotation) {
            this.props.onRotation(90)
        }
    }

    render() {
        let source
        for (let [type, src] of Object.entries(this.props.document)) {
            if (type === 'base64') {
                source = { data: atob(src) }
            } else {
                source = src
            }
        }
        const {
            loader,
            maxScale,
            minScale,
            hideNavbar,
            hideZoom,
            hideRotation,
            navbarOnTop,
            navigation,
            css,
            canvasCss,
            onDocumentClick,
            protectContent,
            watermark,
            alert,
        } = this.props

        const { page, pages, scale, defaultScale, rotationAngle } = this.state

        const NavigationElement = navigation

        const pdf = (
            <PDF
                src={source}
                pageNum={page}
                scale={scale}
                rotation={rotationAngle}
                pageCount={num => this.getPageCount(num)}
                protectContent={protectContent}
                watermark={watermark}
                alert={alert}
            />
        )

        let nav = null
        if (!hideNavbar && pages > 0) {
            nav =
                !navigation ||
                (navigation && typeof navigation === 'object') ? (
                    <Navigation
                        page={page}
                        pages={pages}
                        scale={scale}
                        defaultScale={defaultScale}
                        maxScale={maxScale}
                        minScale={minScale}
                        rotationAngle={rotationAngle}
                        hideZoom={hideZoom}
                        hideRotation={hideRotation}
                        css={navigation ? navigation.css : undefined}
                        handleNextClick={this.handleNextClick}
                        handlePrevClick={this.handlePrevClick}
                        handleZoomIn={this.handleZoomIn}
                        handleResetZoom={this.handleResetZoom}
                        handleZoomOut={this.handleZoomOut}
                        handleRotateLeft={this.handleRotateLeft}
                        handleResetRotation={this.handleResetRotation}
                        handleRotateRight={this.handleRotateRight}
                    />
                ) : (
                    <NavigationElement
                        page={page}
                        pages={pages}
                        scale={scale}
                        defaultScale={defaultScale}
                        maxScale={maxScale}
                        minScale={minScale}
                        rotationAngle={rotationAngle}
                        hideZoom={hideZoom}
                        hideRotation={hideRotation}
                        handleNextClick={this.handleNextClick}
                        handlePrevClick={this.handlePrevClick}
                        handleZoomIn={this.handleZoomIn}
                        handleResetZoom={this.handleResetZoom}
                        handleZoomOut={this.handleZoomOut}
                        handleRotateLeft={this.handleRotateLeft}
                        handleResetRotation={this.handleResetRotation}
                        handleRotateRight={this.handleRotateRight}
                    />
                )
        }

        return (
            <div className={css ? css : 'container text-center'}>
                <div style={{ display: this.state.isReady ? 'none' : 'block' }}>
                    <div
                        className={canvasCss ? canvasCss : ''}
                        style={
                            canvasCss
                                ? {}
                                : {
                                      height: '1000px',
                                      maxHeight: '1000px',
                                      maxWidth: '1000px',
                                      overflow: 'auto',
                                  }
                        }>
                        {loader ? loader : <Loader />}
                    </div>
                </div>
                <div style={{ display: this.state.isReady ? 'block' : 'none' }}>
                    {navbarOnTop ? (
                        <div>
                            <div>{nav}</div>
                            <div
                                className={canvasCss ? canvasCss : ''}
                                style={
                                    canvasCss
                                        ? {}
                                        : {
                                              height: '1000px',
                                              maxHeight: '1000px',
                                              maxWidth: '1000px',
                                              overflow: 'auto',
                                          }
                                }
                                onClick={onDocumentClick}>
                                {pdf}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div
                                className={canvasCss ? canvasCss : ''}
                                style={
                                    canvasCss
                                        ? {}
                                        : {
                                              height: '1000px',
                                              maxHeight: '1000px',
                                              maxWidth: '1000px',
                                              overflow: 'auto',
                                          }
                                }
                                onClick={onDocumentClick}>
                                {pdf}
                            </div>
                            <div>{nav}</div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

PDFViewer.propTypes = {
    document: PropTypes.shape({
        url: PropTypes.string, // File path
        base64: PropTypes.string, // PDF file encoded in base64
    }).isRequired,

    loader: PropTypes.node,
    page: PropTypes.number,
    scale: PropTypes.number,
    scaleStep: PropTypes.number,
    maxScale: PropTypes.number,
    minScale: PropTypes.number,
    css: PropTypes.string,
    canvasCss: PropTypes.string,
    rotationAngle: PropTypes.number,
    onDocumentClick: PropTypes.func,
    onPrevBtnClick: PropTypes.func,
    onNextBtnClick: PropTypes.func,
    onZoom: PropTypes.func,
    onRotation: PropTypes.func,
    hideNavbar: PropTypes.bool,
    navbarOnTop: PropTypes.bool,
    hideZoom: PropTypes.bool,
    hideRotation: PropTypes.bool,
    protectContent: PropTypes.bool,
    watermark: PropTypes.shape({
        text: PropTypes.string,
        diagonal: PropTypes.bool,
        opacity: PropTypes.string,
        size: PropTypes.string,
        color: PropTypes.string,
    }),
    alert: PropTypes.any,
    navigation: PropTypes.oneOfType([
        // Can be an object with css classes or react elements to be rendered
        PropTypes.shape({
            css: PropTypes.shape({
                navbarWrapper: PropTypes.string,
                zoomOutBtn: PropTypes.string,
                resetZoomBtn: PropTypes.string,
                zoomInBtn: PropTypes.string,
                previousPageBtn: PropTypes.string,
                pageIndicator: PropTypes.string,
                nextPageBtn: PropTypes.string,
                rotateLeftBtn: PropTypes.string,
                resetRotationBtn: PropTypes.string,
                rotateRightBtn: PropTypes.string,
            }),
        }),
        // Or a full navigation component
        PropTypes.any,
    ]),
}

PDFViewer.defaultProps = {
    page: 1,
    defaultScale: 1,
    scale: 1,
    scaleStep: 1,
    maxScale: 3,
    minScale: 1,
    rotationAngle: 0,
    hideNavbar: false,
    hideZoom: false,
    hideRotation: false,
    navbarOnTop: false,
}

export default PDFViewer
