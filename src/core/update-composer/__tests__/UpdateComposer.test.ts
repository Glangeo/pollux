import { UpdateComposerBuilder } from '../helpers/UpdateComposerBuilder';

type Test = {
  id: number;
  name: string;
};

describe('UpdateComposer workflow', () => {
  it('builder creates all setters', () => {
    const composer = new UpdateComposerBuilder<Test>()
      .addSetter('id', (value) => value)
      .addSetter('name', (value) => value)
      .build((changes) => changes);

    expect(composer.set).toBeDefined();
    expect(composer.setName).toBeDefined();
    expect(composer.setId).toBeDefined();
    expect(composer.update).toBeDefined();
  });

  it('builder adds only requested setters', () => {
    const composer = new UpdateComposerBuilder<Test>()
      .addSetter('id')
      .build((changes) => changes);

    expect((composer as any).setName).not.toBeDefined();
  });

  it('builder adds default setter correctly', () => {
    const composer = new UpdateComposerBuilder<Test>()
      .addSetter('id')
      .build((changes) => changes);

    const id = composer.setId(1);

    expect(id).toBe(1);
  });

  it('builder adds promise setter correctly', () => {
    const composer = new UpdateComposerBuilder<Test>()
      .addSetter(
        'id',
        (id) =>
          new Promise<number>((resolve) => setTimeout(() => resolve(id), 1))
      )
      .build((changes) => changes);

    composer.setId(2).then((id) => expect(id).toBe(2));
  });

  it('builder allows use of .set method for each defined setter', () => {
    const composer = new UpdateComposerBuilder<Test>()
      .addSetter('id')
      .addSetter('name')
      .build((changes) => changes);

    const id = composer.set('id', 2);
    const name = composer.set('name', 'Jhon');

    expect(id).toBe(2);
    expect(name).toBe('Jhon');
  });

  it('builder throws if undefined setter key was passed to .set method', () => {
    const composer = new UpdateComposerBuilder<Test>()
      .addSetter('id')
      .build((changes) => changes);

    expect(() => composer.set('name' as any, 'Jhon')).toThrow();
  });

  it('composer setters make changes correctly', () => {
    const target: Test = {
      id: 1,
      name: 'Jhon',
    };

    const composer = new UpdateComposerBuilder<Test>()
      .addSetter('id')
      .build((changes) => ({ ...target, ...changes }));

    composer.setId(2);
    const nextTarget = composer.update();

    expect(target.id).toBe(1);
    expect(nextTarget.id).toBe(2);
  });

  it('composer async setters make changes correclty', () => {
    const target: Test = {
      id: 1,
      name: 'Jhon',
    };

    const composer = new UpdateComposerBuilder<Test>()
      .addSetter(
        'id',
        (value) =>
          new Promise<number>((resolve) => setTimeout(() => resolve(value), 1))
      )
      .build((changes) => ({ ...target, ...changes }));

    composer.setId(2).then(() => {
      const nextTarget = composer.update();

      expect(target.id).toBe(1);
      expect(nextTarget.id).toBe(2);
    });
  });
});
