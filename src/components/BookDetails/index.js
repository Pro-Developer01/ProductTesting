import { Stack } from '@mui/system';
import react from 'react';

/* STYLES */
import {
  CardBook,
  CardBookImg,
  CardBookContent,
  CardBookTitle,
  CardBookGridOne,
  CardBookAuthor,
} from './styled';

function BookDetails(props) {
  /* PROPS */
  const { book } = props;

  /* FUNCTIONS */

  const calcAfterColor = (read, hightlights, idea, metadata) => {
    let val = 0;
    if (read > 0) {
      val += 1;
    }
    if (hightlights > 0) {
      val += 1;
    }
    if (idea > 0) {
      val += 1;
    }
    if (metadata > 0) {
      val += 1;
    }

    switch (val) {
      case 0:
        return 'afterColor-0';
      case 1:
        return 'afterColor-0';
      case 2:
        return 'afterColor-1';
      case 3:
        return 'afterColor-2';
      case 3:
        return 'afterColor-3';
      default:
        return 'afterColor-3';
    }
  };
  return (

    <CardBook >
      <Stack direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}>
        <CardBookImg classname='Card-image-w50-h50' src={book.img_path} alt={book.title} />
        <Stack direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={0}>
          <CardBookTitle>{book.title || ''}</CardBookTitle>
          <span>{book.author}</span>
        </Stack>
      </Stack>
    </CardBook >
  );
}

export default BookDetails;
