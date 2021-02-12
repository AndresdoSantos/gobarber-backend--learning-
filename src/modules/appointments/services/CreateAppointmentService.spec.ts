// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppoitmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppoitmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppoitmentService(
      fakeAppoitmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppoitmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppoitmentService(
      fakeAppoitmentsRepository,
    );

    const appointmentDate = new Date(2021, 1, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
