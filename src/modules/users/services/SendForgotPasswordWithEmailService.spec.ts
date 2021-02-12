import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordWithEmailService from './SendForgotPasswordWithEmailService';

describe('SendForgotPasswordWithEmail', () => {
  it('should be able to recover the password using the email ', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordWithEmailService = new SendForgotPasswordWithEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordWithEmailService.execute({
      email: 'johndoe@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be abble to recover a non-existing user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordWithEmailService = new SendForgotPasswordWithEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await expect(
      await sendForgotPasswordWithEmailService.execute({
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
