/** @jsx jsx */
import { useEffect, useRef, useState } from 'react';

import { css, jsx } from '@emotion/react';
import invariant from 'tiny-invariant';

import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import king from '../../icons/king.png';
import pawn from '../../icons/pawn.png';

import { type Coord } from './chessboard-drop-target';

export type PieceType = 'king' | 'pawn';

type PieceProps = {
  location: Coord;
  pieceType: PieceType;
  image: string;
  alt: string;
};

const Piece = ({ location, pieceType, image, alt }: PieceProps) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ location, pieceType }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [location, pieceType]);

  return (
    <img
      css={imageStyles}
// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
      style={dragging ? { opacity: 0.4 } : {}} // fading the piece during dragging
      src={image}
      alt={alt}
      ref={ref}
    />
  );
};

export function King({ location }: { location: [number, number] }) {
  return (
    <Piece location={location} pieceType={'king'} image={king} alt="King" />
  );
}

export function Pawn({ location }: { location: [number, number] }) {
  return (
    <Piece location={location} pieceType={'pawn'} image={pawn} alt="Pawn" />
  );
}

const imageStyles = css({
  width: 45,
  height: 45,
  padding: 4,
  borderRadius: 6,
  boxShadow:
    '1px 3px 3px rgba(9, 30, 66, 0.25),0px 0px 1px rgba(9, 30, 66, 0.31)',
  '&:hover': {
    backgroundColor: 'rgba(168, 168, 168, 0.25)',
  },
});

export default King;
