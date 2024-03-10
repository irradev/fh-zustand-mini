import { FormEvent } from 'react';
import { WhiteCard } from '../../components';
import { FormConfirm } from './FormConfirm';
import { FormEventDate } from './FormEventDate';
import { FormGuests } from './FormGuests';
import { FormPerson } from './FormPerson';



export const WeddingInvitationPage = () => {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formDataJson = Object.fromEntries(formData.entries());
    console.log(formDataJson);
    
  }

  return (
    <>
      <h1>Invitación de Boda</h1>
      <p>Zustand segmentado en slices</p>
      <hr />

      <WhiteCard className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <FormPerson />
            <FormGuests />
            <FormEventDate />
            <FormConfirm />

            <div>
              <button>
                Enviar
              </button>
            </div>
          </form>
        </div>
      </WhiteCard>
    </>
  );
};